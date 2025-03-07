import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  sendAndConfirmTransaction,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

const connection = new Connection(
  "https://rpc.ankr.com/solana_devnet",
  "confirmed"
);

const from = getKeypairFromEnvironment("SECRET_KEY");
const to = getKeypairFromEnvironment("SECRET_KEY_1");

const transaction = new Transaction();
const instruction = SystemProgram.transfer({
  fromPubkey: from.publicKey,
  toPubkey: to.publicKey,
  lamports: 1e9 * 0.0001,
});
transaction.add(instruction);
//sendAndConfirmTransaction发送交易并等待其确认，带有自动确认机制。适用于希望简化交易确认的场景。
const signature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [from],
  { skipPreflight: false }
);
console.log(`交易已发送: https://solscan.io/tx/${signature}`);
//sendRawTransaction发送已签名和序列化的交易。
const { blockhash } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;
transaction.feePayer = from.publicKey;
transaction.sign(from);
const rawTransaction = transaction.serialize();

const signature1 = await connection.sendRawTransaction(rawTransaction, {
  skipPreflight: false,
});
console.log("交易签名：", signature1);
//sendEncodedTransaction发送经过 base64 编码的交易数据，具有更好的兼容性。
const base64Transaction = rawTransaction.toString("base64");
const signature2 = await connection.sendEncodedTransaction(base64Transaction, {
  skipPreflight: false,
});
console.log("交易签名：", signature2);
