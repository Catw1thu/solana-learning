import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const publicKey = new PublicKey(keypair.publicKey.toBase58());
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balance = await connection.getBalance(publicKey);
console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${
    balance / LAMPORTS_PER_SOL
  }!`
);
