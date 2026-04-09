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
        const { topic, limit } = req.query;

        let query = {};

        if (topic) {
            query.topic = topic;
        }

        let questions = await Question.find(query);

        // shuffle for randomness
        questions = questions.sort(() => 0.5 - Math.random());

        if (limit) {
            questions = questions.slice(0, parseInt(limit));
        }

        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/submit", async (req, res) => {
    const { answers } = req.body;

    try {
        let correct = 0;
        let wrong = 0;

        for (let ans of answers) {
            const q = await Question.findById(ans.questionId);

            if (!q) continue;

            if (q.correctAnswer === ans.selectedOption) {
                correct++;
            } else {
                wrong++;
            }
        }

        const total = correct + wrong;
        const percentage = total > 0 ? (correct / total) * 100 : 0;

        res.json({
            score: correct,
            total,
            correct,
            wrong,
            percentage
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;