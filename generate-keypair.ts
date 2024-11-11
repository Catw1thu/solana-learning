import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
// generate a new keypair
// const keypair = Keypair.generate();

// console.log(`The public key is: `, keypair.publicKey.toBase58());
// console.log(`The secret key is: `, keypair.secretKey);
// console.log(`✅ Finished!`);

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log("The PublicKey is: ", keypair.publicKey.toBase58());
