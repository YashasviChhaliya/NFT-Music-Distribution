const express = require("express");
const Music = require("../models/Music");
const router = express.Router();

// Upload music
router.post("/upload", async (req, res) => {
    try {
        const { title, artist, url } = req.body;
        const newMusic = new Music({ title, artist, url });
        await newMusic.save();
        res.json({ message: "Music uploaded", music: newMusic });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all music
router.get("/", async (req, res) => {
    try {
        const musicList = await Music.find();
        res.json(musicList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
