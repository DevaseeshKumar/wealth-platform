import express from "express";

import verifyToken
from "../middleware/authMiddleware";

import {
    getMutualFunds,
    createMutualFund
}
from "../controllers/mfFundController";

const router = express.Router();

router.get(
    "/:investorId",
    // verifyToken,
    getMutualFunds
);

router.post(
    "/",
    verifyToken,
    createMutualFund
);

export default router;