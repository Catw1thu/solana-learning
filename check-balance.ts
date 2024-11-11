import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

async function checkBalance(walletAddress: string) {
  try {
    const address = new PublicKey(walletAddress);
    const connection = new Connection(
      "https://api.mainnet-beta.solana.com",
      "confirmed"
    );

    const balance = await connection.getBalance(address);
    const balanceInSOL = balance / LAMPORTS_PER_SOL;

    console.log(
      `The balance of the account at ${address} is ${balanceInSOL} SOL`
    );
  } catch (error) {
    console.error(
      "Failed to retrieve balance. Please ensure the wallet address is valid."
    );
    console.error(`Error details: ${error.message}`);
  }
}

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  console.error("Provide a public key to check the balance");
} else {
  checkBalance(suppliedPublicKey);
}
