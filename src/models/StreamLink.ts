import { Keypair, PublicKey } from '@solana/web3.js';
import { encode as b58encode, decode as b58decode } from 'bs58';
import { kdfz, randBuf } from './utils/cryptoUtils';
import solanaService from './services/solanaService';
import { CONFIG } from './config';

export class StreamLink {
    url: URL;
    keypair: Keypair;
    walletAddress: PublicKey | null = null;

    private constructor(url: URL, keypair: Keypair) {
        this.url = url;
        this.keypair = keypair;
    }

    // Factory method to create a new StreamLink
    public static async create(): Promise<StreamLink> {
        const randomBytes = await randBuf(CONFIG.DEFAULT_STREAMLINK_KEYLENGTH);
        const keypair = await this.generateKeypairFromRandomBytes(randomBytes);
        const hash = b58encode(randomBytes);
        const urlString = `${CONFIG.STREAMLINK_ORIGIN}${CONFIG.STREAMLINK_PATH}#${hash}`;
        const link = new URL(urlString);
        return new StreamLink(link, keypair);
    }

    // Create StreamLink from a URL
    public static async fromUrl(url: URL): Promise<StreamLink> {
        const slug = url.hash.slice(1);
        if (!slug) {
            throw new Error('URL hash missing in StreamLink URL.');
        }

        const pw = Uint8Array.from(b58decode(slug));
        const keypair = await this.generateKeypairFromPassword(pw);
        return new StreamLink(url, keypair);
    }

    // Create StreamLink from a string link
    public static async fromLink(link: string): Promise<StreamLink> {
        const url = new URL(link);
        return this.fromUrl(url);
    }

    // Fetch the balance of the keypair associated with this StreamLink
    async getBalance(): Promise<number> {
        try {
            const publicKey = this.walletAddress?.toBase58();
            if (!publicKey) {
                throw new Error('Wallet address is not set.');
            }
            const balance = await solanaService.getBalance(publicKey);
            return balance;
        } catch (error) {
            throw new Error(`Failed to fetch balance: ${error.message}`);
        }
    }

    // Send a transaction using the keypair associated with this StreamLink
    async sendTransaction(recipientAddress: string, amount: number): Promise<string> {
        try {
            const totalAmount = amount + CONFIG.FEE_AMOUNT;
            const transactionHash = await solanaService.sendTransaction(
                this.keypair,
                recipientAddress,
                totalAmount
            );
            return transactionHash;
        } catch (error) {
            throw new Error(`Failed to send transaction: ${error.message}`);
        }
    }

    // Create a payment link for this StreamLink
    createPaymentLink(amount: number, description: string): string {
        try {
            if (amount <= 0) {
                throw new Error('Amount must be a positive number.');
            }
            if (!description.trim()) {
                throw new Error('Description cannot be empty.');
            }
            const paymentLink = `${this.url.toString()}?amount=${amount}&description=${encodeURIComponent(
                description
            )}`;
            return paymentLink;
        } catch (error) {
            throw new Error(`Failed to create payment link: ${error.message}`);
        }
    }

    // Set the wallet address
    setWalletAddress(walletAddress: PublicKey | null) {
        try {
            if (walletAddress && walletAddress.equals(PublicKey.default)) {
                throw new Error('Invalid wallet address provided.');
            }
            this.walletAddress = walletAddress;
        } catch (error) {
            throw new Error(`Failed to set wallet address: ${error.message}`);
        }
    }

    private static async generateKeypairFromRandomBytes(randomBytes: Uint8Array): Promise<Keypair> {
        const seed = await kdfz(CONFIG.ED25519_SEED_LENGTH, randomBytes);
        return Keypair.fromSeed(seed);
    }

    private static async generateKeypairFromPassword(password: Uint8Array): Promise<Keypair> {
        const seed = await kdfz(CONFIG.ED25519_SEED_LENGTH, password);
        return Keypair.fromSeed(seed);
    }
}
