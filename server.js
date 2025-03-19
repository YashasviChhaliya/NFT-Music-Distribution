const express = require("express");
const { AptosClient, AptosAccount, FaucetClient } = require("aptos");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
const faucetClient = new FaucetClient("https://faucet.devnet.aptoslabs.com", client);

// Dummy route to check backend is working
app.get("/", (req, res) => res.send("Backend is running!"));

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
