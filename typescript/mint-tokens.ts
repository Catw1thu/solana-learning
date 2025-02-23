import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import getSolscanLink from "./solscan.ts";

const connection = new Connection(clusterApiUrl("devnet"));
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const user = getKeypairFromEnvironment("SECRET_KEY");
const tokenMintAccount = new PublicKey(
  "BtjkiG7nnuTRzFbCPyX3xGnfsLMmD6svyg2mYf7nCafX"
);
const recipientMintAccount = new PublicKey(
  "CuTvkGbw2o1YvPrphDE4aa5aH9jim8r4L5PYAoh59FDy"
);

const signature = await mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientMintAccount,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getSolscanLink("transaction", signature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);
