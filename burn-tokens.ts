import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { burn, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";
import getSolscanLink from "./solscan";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");
const token_decimals = 2;
const burn_amount = 5;
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
  const burnAmount = burn_amount * 10 ** token_decimals;
  const burnTransactionSignature = await burn(
    connection,
    user,
    userTA.address,
    tokenMintAccount,
    user,
    burnAmount
  );
  const link = getSolscanLink(
    "transaction",
    burnTransactionSignature,
    "devnet"
  );
  console.log(`✅ Burn Transaction: ${link}`);
} catch (e) {
  console.error(`Error: ${e instanceof Error ? e.message : String(e)}`);
}
