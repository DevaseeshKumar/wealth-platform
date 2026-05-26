import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import marketPriceRoutes
from "./routes/marketPriceRoutes";

import equityHoldingRoutes
from "./routes/equityHoldingRoutes";

import equityTransactionRoutes
from "./routes/equityTransactionRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/market-prices",
    marketPriceRoutes
);

app.use(
    "/api/holdings",
    equityHoldingRoutes
);

app.use(
    "/api/transactions",
    equityTransactionRoutes
);

app.get("/", (req, res) => {

    res.json({
        message: "Equity Service Running"
    });
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {

    console.log(
        `Equity Service Running On ${PORT}`
    );
});