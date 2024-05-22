import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://devnet-rpc.shyft.to?api_key=_8cNtc7aXbGqMk5t');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://arweave.net/8S0nzpyjY2JqrK_I9ise_k7AHFvkZ08NGVb1vEUW9Ao"
        const metadata = {
            name: "alladin's rug",
            symbol: "ALDN-RUG",
            description: "A magical rugg, this will make sure that your trading portfolio looks green",
            image: image,
            attributes: [
                //speciality for that specific nft
                { trait_type: 'base_color', value: 'green' },
                { trait_type: 'secondary_color', value: 'blue' },
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/8S0nzpyjY2JqrK_I9ise_k7AHFvkZ08NGVb1vEUW9Ao"
                    },
                ]
            },
            creators: [keypair.publicKey]
        };
        const myUri = await umi.uploader.uploadJson([metadata])
        console.log("Your image URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();