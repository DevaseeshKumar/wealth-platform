import express from "express";

import verifyToken
from "../middleware/authMiddleware";

import {
    getEquityTransactions,
    createEquityTransaction
}
from "../controllers/equityTransactionController";

const router = express.Router();

router.get(
    "/:investorId",
    verifyToken,
    getEquityTransactions
);

router.post(
    "/",
    verifyToken,
    createEquityTransaction
);

export default router;