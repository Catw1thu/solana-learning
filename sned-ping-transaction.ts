import {
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const transaction = new Transaction();
const programId = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const programDataPubkey = new PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

const instruction = new TransactionInstruction({
  programId,
  keys: [{ pubkey: programDataPubkey, isSigner: false, isWritable: true }],
});

transaction.add(instruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(
  `You can view your transaction on Solana Explorer at:\nhttps://solscan.io/tx/${signature}?cluster=devnet`
);
