const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const drugRoutes = require("./routes/drugRoutes");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/drugs", drugRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});