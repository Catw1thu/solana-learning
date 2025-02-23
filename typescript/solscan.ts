export default function getSolscanLink(
  type: "account" | "transaction" | "token",
  id: string,
  network: "mainnet" | "testnet" | "devnet" = "mainnet" // 默认值为主网
): string {
  const baseUrl = "https://solscan.io/"; // 所有网络的基础 URL 是一样的

  // 判断是否是 transaction 类型，需要特殊处理
  const urlType = type === "transaction" ? "tx" : type;

  // 根据类型生成不同的链接
  const link = `${baseUrl}${urlType}/${id}`;

  // 如果不是主网，附加 ?cluster=network
  return network === "mainnet" ? link : `${link}?cluster=${network}`;
}
