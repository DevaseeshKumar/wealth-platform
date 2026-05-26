import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import mfFundRoutes
from "./routes/mfFundRoutes";

import mfSipRoutes
from "./routes/mfSipRoutes";

import mfTransactionRoutes
from "./routes/mfTransactionRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/funds",
    mfFundRoutes
);

app.use(
    "/api/sips",
    mfSipRoutes
);

app.use(
    "/api/transactions",
    mfTransactionRoutes
);

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