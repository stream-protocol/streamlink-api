import { Keypair, Connection, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

const SOLANA_CLUSTER_URL = "https://api.mainnet-beta.solana.com"; 

const connection = new Connection(SOLANA_CLUSTER_URL, 'confirmed');

const solanaService = {
    async getBalance(publicKey: string): Promise<number> {
        const balance = await connection.getBalance(new PublicKey(publicKey));
        return balance / LAMPORTS_PER_SOL;
    },
    
    async sendTransaction(keypair: Keypair, recipientAddress: string, amount: number): Promise<string> {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: new PublicKey(recipientAddress),
                lamports: amount
            })
        );
        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        transaction.sign(keypair);

        const signature = await connection.sendTransaction(transaction);
        return signature;
    }
};

export default solanaService;
