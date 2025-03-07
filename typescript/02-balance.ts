import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(
  "https://solana-rpc.publicnode.com",
  "confirmed"
);

async function main() {
  const publicKey = new PublicKey(
    "CXPeim1wQMkcTvEHx9QdhgKREYYJD8bnaCCqPRwJ1to1"
  );
  const balance = await connection.getBalance(publicKey);
  console.log(`Jito1余额: ${balance / 1e9} SOL`);
}
main();
