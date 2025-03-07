import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import dotenv from "dotenv";
dotenv.config();

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const to = getKeypairFromEnvironment("SECRET_KEY_1");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey: to.publicKey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} lamports to the address ${to.publicKey}. `
);
console.log(
  `Transaction signature is https://solscan.io/tx/${signature}?cluster=devnet`
);
