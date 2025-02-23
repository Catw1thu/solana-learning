import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { approve, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import getSolscanLink from "./solscan";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");
const token_decimals = 2;
const minor_units_per_major_units = 10 ** token_decimals;
const delegate_amount = 50;
const delegatePuilicKey = new PublicKey(SystemProgram.programId);
const tokenMintAddress = new PublicKey(
  "BtjkiG7nnuTRzFbCPyX3xGnfsLMmD6svyg2mYf7nCafX"
);

try {
  const userTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAddress,
    user.publicKey
  );
  const approveTransactionSignature = await approve(
    connection,
    user,
    userTokenAccount.address,
    delegatePuilicKey,
    user.publicKey,
    delegate_amount * minor_units_per_major_units
  );
  const link = getSolscanLink(
    "transaction",
    approveTransactionSignature,
    "devnet"
  );
  console.log(`✅ Delegate approved. Transaction: ${link}`);
} catch (error) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );
}
