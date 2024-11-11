import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubKey = process.argv[2] || null;

if (!suppliedToPubKey) {
  console.log("Please provide a recipient public key");
  process.exit(1);
}

const snederKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPublicKey: ${suppliedToPubKey}`);
const toPubKey = new PublicKey(suppliedToPubKey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();
const lamports = 1;

const instruction = SystemProgram.transfer({
  fromPubkey: snederKeypair.publicKey,
  toPubkey: toPubKey,
  lamports: lamports * LAMPORTS_PER_SOL,
});

transaction.add(instruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  snederKeypair,
]);

console.log(`💸 Finished! Sent ${lamports} sol to the address ${toPubKey}.`);
console.log(`Transaction signature is ${signature}!`);
