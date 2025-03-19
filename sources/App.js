import React, { useState } from "react";
import { AptosClient } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

function App() {
    const [wallet, setWallet] = useState(null);
    const [minting, setMinting] = useState(false);

    const connectWallet = async () => {
        const aptosAccount = new AptosAccount();
        setWallet(aptosAccount);
    };

    const mintNFT = async () => {
        setMinting(true);
        await axios.post("http://localhost:3000/mint", {
            name: "Music NFT",
            uri: "https://example.com/nft.mp3",
        });
        setMinting(false);
    };

    return (
        <div>
            <h1>NFT Music Distribution</h1>
            {wallet ? (
                <div>
                    <p>Wallet Connected: {wallet.address()}</p>
                    <button onClick={mintNFT} disabled={minting}>
                        {minting ? "Minting..." : "Mint NFT"}
                    </button>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
}

export default App;
