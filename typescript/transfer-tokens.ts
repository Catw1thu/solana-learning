import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";
import getSolscanLink from "./solscan.ts";

const connection = new Connection(clusterApiUrl("devnet"));
const sender = getKeypairFromEnvironment("SECRET_KEY");
const recipient = new PublicKey("3ecZQGhsExGeXujFtdc395Vn1fEncYm3yTfkPe2MSgCV");
const tokenMintAccount = new PublicKey(
  "BtjkiG7nnuTRzFbCPyX3xGnfsLMmD6svyg2mYf7nCafX"
);
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const sourceTA = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  sender.publicKey
);
const destinationTA = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

const signature = await transfer(
  connection,
  sender,
  sourceTA.address,
  destinationTA.address,
  sender,
  1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getSolscanLink("transaction", signature, "devnet");
console.log(`✅ Transaction confirmed, explorer link is: ${link}`);
