const express = require("express");
const router = express.Router();
const Drug = require("../models/Drug");

// Add Drug
router.post("/add", async (req, res) => {
    const { name, uses, sideEffects } = req.body;

    try {
        const drug = new Drug({ name, uses, sideEffects });
        await drug.save();
        res.json(drug);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Drugs
router.get("/", async (req, res) => {
    try {
        const drugs = await Drug.find();
        res.json(drugs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;