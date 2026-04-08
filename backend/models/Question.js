const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: Number, // index (0,1,2,3)
    topic: String
});

module.exports = mongoose.model("Question", questionSchema);