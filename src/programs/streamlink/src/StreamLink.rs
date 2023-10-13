import { Keypair, Transaction, TransactionInstruction, sendAndConfirmTransaction, Connection } from '@solana/web3.js';
import { CONFIG } from '../config';

const connection = new Connection(CONFIG.SOLANA_RPC_URL, 'single');

export class StreamLink {
  url: URL;
  keypair: Keypair;

  private constructor(url: URL, keypair: Keypair) {
    this.url = url;
    this.keypair = keypair;
  }

  // Factory method to create a new StreamLink
  public static async create(): Promise<StreamLink> {
    const b = await randBuf(CONFIG.DEFAULT_STREAMLINK_KEYLENGTH);
    const keypair = await this.pwToKeypair(b);
    const hash = b58encode(b);
    const urlString = `${CONFIG.STREAMLINK_ORIGIN}${CONFIG.STREAMLINK_PATH}#${hash}`;
    const link = new URL(urlString);
    return new StreamLink(link, keypair);
  }

  // Create StreamLink from a URL
  public static async fromUrl(url: URL): Promise<StreamLink> {
    const slug = url.hash.slice(1);
    if (!slug) throw new Error('URL hash missing in StreamLink URL.');

    const pw = Uint8Array.from(b58decode(slug));
    const keypair = await this.pwToKeypair(pw);
    return new StreamLink(url, keypair);
  }

  // Create StreamLink from a string link
  public static async fromLink(link: string): Promise<StreamLink> {
    const url = new URL(link);
    return this.fromUrl(url);
  }

  // Convert password to a keypair
  private static async pwToKeypair(pw: Uint8Array): Promise<Keypair> {
    const seed = await kdfz(CONFIG.ED25519_SEED_LENGTH, pw);
    return Keypair.fromSeed(seed);
  }

  // Fetch the balance of the keypair associated with this StreamLink
  async getBalance(): Promise<number> {
    return await solanaService.getBalance(this.keypair.publicKey.toBase58());
  }

  // Send a transaction using the keypair associated with this StreamLink
  async sendTransactionWithFee(
    recipientAddress: string,
    amount: number,
    includeFee: boolean = true
  ): Promise<string> {
    if (includeFee) {
      amount -= this.calculateTransactionFee(amount);
    }

    const transaction = new Transaction().add(
      TransactionInstruction.fromKeysAndData({
        keys: [{ pubkey: this.keypair.publicKey, isSigner: true, isWritable: true }],
        programId: CONFIG.SOLANA_PROGRAM_ID,
        data: Buffer.from(amount.toString()),
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [this.keypair],
      { commitment: 'single' }
    );

    return signature;
  }

  // Calculate the transaction fee
  private calculateTransactionFee(amount: number): number {
    const feePercentage = CONFIG.TRANSFER_FEE_PERCENTAGE;
    const fee = (amount * feePercentage) / 100;

    // Ensure the fee is at least the minimum transaction cost
    return Math.max(fee, CONFIG.MIN_TRANSACTION_COST);
  }
}
