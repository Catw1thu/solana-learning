import { Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";
const keypair = getKeypairFromEnvironment("SECRET_KEY");
console.log(keypair.publicKey.toBase58());
