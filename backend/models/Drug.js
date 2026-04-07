const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uses: String,
    sideEffects: String
});

module.exports = mongoose.model("Drug", drugSchema);