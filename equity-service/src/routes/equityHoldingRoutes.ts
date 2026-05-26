import express from "express";

import verifyToken
from "../middleware/authMiddleware";

import {
    getEquityHoldings,
    createEquityHolding
}
from "../controllers/equityHoldingController";

const router = express.Router();

router.get(
    "/:investorId",
    verifyToken,
    getEquityHoldings
);

router.post(
    "/",
    verifyToken,
    createEquityHolding
);

export default router;