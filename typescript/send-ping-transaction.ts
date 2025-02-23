import {
  Connection,
  clusterApiUrl,
  Transaction,
  PublicKey,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS =
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const transcaciton = new Transaction();
const programId = new PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new TransactionInstruction({
  programId,
  keys: [
    {
      pubkey: pingProgramDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
});

transcaciton.add(instruction);

const signature = await sendAndConfirmTransaction(connection, transcaciton, [
  payer,
]);

console.log(
  `✅ Transaction completed! Signature is
  https://solscan.io/tx/${signature}?cluster=devnet`
);
