import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, revoke } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";
import getSolscanLink from "./solscan";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");
const tokenMintAccount = new PublicKey(
  "BtjkiG7nnuTRzFbCPyX3xGnfsLMmD6svyg2mYf7nCafX"
);

try {
  const userTA = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    user.publicKey
  );
  const revokeTransactionSignature = await revoke(
    connection,
    user,
    userTA.address,
    user.publicKey
  );
  const link = getSolscanLink(
    "transaction",
    revokeTransactionSignature,
    "devnet"
  );
  console.log(`✅ Revoke Delegate Transaction: ${link}`);
} catch (error) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );
}
