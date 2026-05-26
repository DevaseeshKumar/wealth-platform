import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "MF Service Running"
    });
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
    console.log(
        `MF Service Running On ${PORT}`
    );
});