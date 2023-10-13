import { Keypair, Connection, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } from '@solana/web3.js';
import { CONFIG } from '../config';

const connection = new Connection(CONFIG.SOLANA_RPC_URL, 'single');

export async function getBalance(publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance;
  } catch (error) {
    throw new Error(`Failed to get balance: ${error}`);
  }
}

export async function sendTransaction(
  sender: Keypair,
  recipientAddress: PublicKey,
  amount: number
): Promise<string> {
  try {
    const transaction = new Transaction().add(
      TransactionInstruction.newTransfer({
        source: sender.publicKey,
        destination: recipientAddress,
        amount,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    return signature;
  } catch (error) {
    throw new Error(`Failed to send transaction: ${error}`);
  }
}
