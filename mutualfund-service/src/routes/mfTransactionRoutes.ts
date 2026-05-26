import express from "express";

import verifyToken
from "../middleware/authMiddleware";

import {
    getMfTransactions,
    createMfTransaction
}
from "../controllers/mfTransactionController";

const router = express.Router();

router.get(
    "/:investorId",
    verifyToken,
    getMfTransactions
);

router.post(
    "/",
    verifyToken,
    createMfTransaction
);

export default router;  