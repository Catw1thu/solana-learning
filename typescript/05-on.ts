import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);
// 监听orcACRJYTFjTeo2pV8TfYRTpmqfoYgbVi9GeANXTCc8账户是否发生变化
connection.onAccountChange(
  new PublicKey("orcACRJYTFjTeo2pV8TfYRTpmqfoYgbVi9GeANXTCc8"),
  (accountInfo) => {
    console.log(`账户变化: ${JSON.stringify(accountInfo)}\n`);
  }
);
// 监听raydium v4的日志
connection.onLogs(
  new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"),
  (logs) => {
    console.log(`日志: ${JSON.stringify(logs)}\n`);
  }
);
