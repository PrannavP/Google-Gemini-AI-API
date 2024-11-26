const express = require("express");
const dotenv =  require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// load env file
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ask", async (req, res) => {
    const prompt = req.body.prompt;

    const result = await model.generateContent(prompt);
    console.log(result);
    res.json(result.response.text());
});

app.get("/", (req, res) => {
    res.json({ "message": "hello world" });
});

// port
app.listen(3001, () => console.log("Server http://localhost:3001/"));