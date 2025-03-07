import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

// const connection = new Connection(
//   "https://solana-testnet-rpc.publicnode.com",
//   "confirmed"
// );

const connection = new Connection(
  "https://rpc.ankr.com/solana_devnet",
  "confirmed"
);

const user = getKeypairFromEnvironment("SECRET_KEY");
const user1 = getKeypairFromEnvironment("SECRET_KEY_1");
console.log(user.publicKey.toString());
async function transfer() {
  const transaction = new Transaction();
  const instruction = SystemProgram.transfer({
    fromPubkey: user.publicKey,
    toPubkey: user1.publicKey,
    lamports: 0.1 * 1e9,
  });
  transaction.add(instruction);

  connection.getLatestBlockhash();

  const simulateResult = await connection.simulateTransaction(transaction, [
    user,
  ]);
  console.log("模拟交易结果:", simulateResult);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    user,
  ]);
  console.log(`交易已发送:https//solscan.io/tx${signature}`);
}

transfer();
