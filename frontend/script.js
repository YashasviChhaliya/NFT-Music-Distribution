// Connect Wallet Function
async function connectWallet() {
    console.log("Checking for Welldone Wallet...");
    if (typeof aptos.welldone !== "undefined") {
        try {
            const response = await aptos.welldone.connect();
            console.log("Wallet connected:", response);
            alert("Wallet Connected: " + response.address);
        } catch (error) {
            console.error("Wallet connection failed:", error);
            alert("Failed to connect wallet. Check console for details.");
        }
    } else {
        alert("Welldone wallet not found. Please install Welldone Wallet.");
        window.open("https://chrome.google.com/webstore/detail/welldone-wallet/pdnfnkhpgegpcingjbfihlkjeighnddk", "_blank");
    }
}

// Mint Music NFT Function
async function mintMusicNFT() {
    console.log(window.aptos.welldone);
    if (!window.aptos.welldone) {
        alert("Please connect to an Aptos wallet first.");
        return;
    }

    const price = 100; // NFT Price
    const payload = {
        function: "0x21916cf9302024cbae851a488a01d621066181aca7a4110f532c22b99b6f60b5::MusicNFT::mint_nft",
        type_arguments: [],
        arguments: [price] // Pass Price
    };

    try {
        const transaction = await window.aptos.welldone.signAndSubmitTransaction(payload);
        alert("Transaction sent! Hash: " + transaction.hash);
    } catch (error) {
        console.error("Minting failed:", error);
        alert("Minting failed!");
    }
}

// Buy NFT Function
async function buyNFT() {
    console.log(window.aptos.welldone);
    if (!window.aptos.welldone) {
        alert("Please connect to an Aptos wallet first.");
        return;
    }

    const seller = "0xSellerAddressHere"; // Replace with actual seller address
    const amount = 100; // NFT Price

    const payload = {
        function: "0x21916cf9302024cbae851a488a01d621066181aca7a4110f532c22b99b6f60b5::MusicNFT::buy_nft",
        type_arguments: [],
        arguments: [seller, amount] // Pass Seller Address & Amount
    };

    try {
        const transaction = await window.aptos.welldone.signAndSubmitTransaction(payload);
        alert("Transaction sent! Hash: " + transaction.hash);
    } catch (error) {
        console.error("Purchase failed:", error);
        alert("Purchase failed!");
    }
}

// Attach event listeners to buttons
document.getElementById("login-signup").addEventListener("click", function () {
    window.location.href = "login.html";
});
document.getElementById("connect-wallet").addEventListener("click", connectWallet);
document.getElementById("mint-nft").addEventListener("click", mintMusicNFT);
document.getElementById("buy-nft").addEventListener("click", buyNFT);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    alert(data.message);
    });
});

