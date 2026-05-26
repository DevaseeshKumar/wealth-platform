import express from "express";

import verifyToken
from "../middleware/authMiddleware";

import {
    getMarketPrices,
    getStockBySymbol,
    createMarketPrice
}
from "../controllers/marketPriceController";

const router = express.Router();

router.get(
    "/",
    // verifyToken,
    getMarketPrices
);

router.get(
    "/:symbol",
    verifyToken,
    getStockBySymbol
);

router.post(
    "/",
    verifyToken,
    createMarketPrice
);

export default router;