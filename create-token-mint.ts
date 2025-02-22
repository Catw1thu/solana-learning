import { createAccount, createMint } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
console.log(tokenMint);
console.log(`✅ Finished! Created token mint: 
    https://solscan.io/address/${tokenMint.toString()}?cluster=devnet`);
