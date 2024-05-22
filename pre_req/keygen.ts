import { Keypair } from "@solana/web3.js";

let keyPair = Keypair.generate();
console.log(
  `You've generated a new Solana wallet: ${keyPair.publicKey.toBase58()}, secreat key [${keyPair.secretKey}]`,
);
