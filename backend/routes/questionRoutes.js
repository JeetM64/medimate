const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Add Question
router.post("/add", async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/submit", async (req, res) => {
    const { answers } = req.body; 
    // answers = [{ questionId, selectedOption }]

    try {
        let score = 0;

        for (let ans of answers) {
            const q = await Question.findById(ans.questionId);
            if (q.correctAnswer === ans.selectedOption) {
                score++;
            }
        }

        res.json({ score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;