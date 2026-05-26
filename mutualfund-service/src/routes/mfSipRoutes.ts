import express from "express";

import verifyToken
from "../middleware/authMiddleware";

import {
    getSips,
    createSip
}
from "../controllers/mfSipController";

const router = express.Router();

router.get(
    "/:investorId",
    verifyToken,
    getSips
);

router.post(
    "/",
    verifyToken,
    createSip
);

export default router;