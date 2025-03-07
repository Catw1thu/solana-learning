import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(
  "https://solana-rpc.publicnode.com",
  "confirmed"
);

// getSlot 获取当前slot
const slot = await connection.getSlot();
console.log(`current slot:${slot}`);

// getBalance 获取指定账户的SOL余额
const balance = await connection.getBalance(
  new PublicKey("CXPeim1wQMkcTvEHx9QdhgKREYYJD8bnaCCqPRwJ1to1")
);
console.log(`J1to1 balance:${balance / 1e9}`);

// getTokenAccountBalance 查询指定代币账户的余额
// 获取web3xFMwEPrc92NeeXdAigni95NDnnd2NPuajTirao2账户的USDC余额
// https://solscan.io/account/HGtAdvmncQSk59mAxdh2M7GTUq1aB9WTwh7w7LwvbTBT
const tokenAccountBalance = await connection.getTokenAccountBalance(
  new PublicKey("HGtAdvmncQSk59mAxdh2M7GTUq1aB9WTwh7w7LwvbTBT")
);
console.log(`token账户余额: ${JSON.stringify(tokenAccountBalance)}\n`);

// getFirstAvailableBlock 获取当前RPC节点可以访问的最早区块号。
const firstAvailableBlock = await connection.getFirstAvailableBlock();
console.log(`first available block:${firstAvailableBlock}`);

// getLatestBlockhash 获取最新的区块hash。
const latestBlockhash = await connection.getLatestBlockhash();
console.log(`latest block hash:${latestBlockhash}`);

// getParsedAccountInfo 交易获取已解析的交易详细信息。
// 解析一笔转账SOL交易
const parsedTransaction = await connection.getParsedTransaction(
  "3Vfp5qPhF14bNb2jLtTccabCDbHUmxqtXerUvPEjKb6RpJ8jU3H9M9JgcUbDPtgesB3WFP9M8VZTzECgBavnjxaC",
  {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  }
);
console.log(`已解析的交易: ${JSON.stringify(parsedTransaction)}\n`);

//getSignaturesForAddress 获取与指定账户地址相关的交易签名列表。
// 获取web3xFMwEPrc92NeeXdAigni95NDnnd2NPuajTirao2账户下最新的3笔交易
const signatures = await connection.getSignaturesForAddress(
  new PublicKey("web3xFMwEPrc92NeeXdAigni95NDnnd2NPuajTirao2"),
  {
    limit: 3,
  }
);
console.log(`最近的3笔交易签名: ${JSON.stringify(signatures)}\n`);
//getTokenAccountsByOwner用于查询某个账户下所有的代币账户。
const tokenAccountsByOwner = await connection.getTokenAccountsByOwner(
  new PublicKey("web3xFMwEPrc92NeeXdAigni95NDnnd2NPuajTirao2"),
  {
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  },
  "confirmed"
);
console.log(`token账户: ${JSON.stringify(tokenAccountsByOwner)}\n`);
//getTokenLargestAccounts查询某个代币的20个最大持有者账户。
// 获取代币mint地址为Dp4fXozKtwgK1cL5KQeeNbuAgFpJtY3FbAvL8JrWpump的前20持有者
const tokenLargestAccounts = await connection.getTokenLargestAccounts(
  new PublicKey("Dp4fXozKtwgK1cL5KQeeNbuAgFpJtY3FbAvL8JrWpump")
);
console.log(
  `20个token最大持有者账户: ${JSON.stringify(tokenLargestAccounts)}\n`
);
//getTokenSupply获取代币的供应量。
// 获取USDC的供应量
const supplyInfo = await connection.getTokenSupply(
  new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
);
console.log(`Total supply: ${supplyInfo.value.amount}\n`);
//getParsedProgramAccounts批量获取某个程序账户下的所有账户信息。
// 获取代币mint地址为Dp4fXozKtwgK1cL5KQeeNbuAgFpJtY3FbAvL8JrWpump的所有持有者
const mintAddress = new PublicKey(
  "Dp4fXozKtwgK1cL5KQeeNbuAgFpJtY3FbAvL8JrWpump"
);
const accounts = await connection.getParsedProgramAccounts(
  new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
  {
    filters: [
      {
        dataSize: 165, // Token 账户的数据大小是 165 字节
      },
      {
        memcmp: {
          offset: 0, // 0 偏移表示 Token Mint 地址的位置
          bytes: mintAddress.toBase58(),
        },
      },
    ],
  }
);

// 只打印3个持有者
console.log("前3个账户:", accounts.slice(0, 3));
