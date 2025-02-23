import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey(
  "BtjkiG7nnuTRzFbCPyX3xGnfsLMmD6svyg2mYf7nCafX"
);
const recipient = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);
console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);
console.log(`✅ Created token Account: ${link}`);
