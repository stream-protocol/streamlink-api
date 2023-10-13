import { Connection, Keypair, Transaction, TransactionInstruction, sendAndConfirmTransaction } from '@solana/web3.js';
import { CONFIG } from '../config';

// Create a Solana connection object once and reuse it
const connection = new Connection(CONFIG.SOLANA_RPC_URL, 'single');

/**
 * Get the balance of a Solana account.
 * @param publicKey The public key of the account.
 * @returns The balance of the account.
 */
export async function getBalance(publicKey: string): Promise<number> {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance;
  } catch (error) {
    throw new Error(`Failed to get balance for account ${publicKey}: ${error.message}`);
  }
}

/**
 * Send a Solana transaction.
 * @param sender The sender's Solana keypair.
 * @param recipientAddress The recipient's Solana address.
 * @param amount The amount to send.
 * @returns The transaction signature.
 */
export async function sendTransaction(
  sender: Keypair,
  recipientAddress: string,
  amount: number
): Promise<string> {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: amount,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    return signature;
  } catch (error) {
    throw new Error(`Failed to send transaction: ${error.message}`);
  }
}
