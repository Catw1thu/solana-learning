import { Keypair } from "@solana/web3.js";
import fs from "fs";
import { Buffer } from "buffer";

const wallet = Keypair.generate();

const publikcKey = wallet.publicKey.toBase58();
const secretKey = wallet.secretKey;

console.log("wallet public key:", publikcKey);
console.log("wallet secret key", secretKey);
console.log(
  "wallet secret key base64:",
  Buffer.from(secretKey).toString("base64")
);
