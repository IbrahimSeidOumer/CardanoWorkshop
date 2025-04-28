const { ethers } = require("ethers");

function generateCryptoWallet() {
    try {
        
        const wallet = ethers.Wallet.createRandom();  
        console.log("🔥 Seed Phrase (COPY AND SAVE IT)");
        console.log(wallet.mnemonic.phrase);
        console.log("🔑 Private Key (KEEP SECRET):", wallet.privateKey);
        console.log("📬 Ethereum Address:", wallet.address);
        
        return {
            mnemonic: wallet.mnemonic.phrase,
            privateKey: wallet.privateKey,
            address: wallet.address
        };
        
    } catch (error) {
        console.error("🚨 Error generating wallet:", error);
        process.exit(1);
    }
}


generateCryptoWallet();