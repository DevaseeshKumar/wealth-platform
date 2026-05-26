import {
    fetchMfTransactions,
    insertMfTransaction
}
from "../models/mfTransactionModel";

const getMfTransactions = async (req: any,res: any) => {
    try {
        const transactions = await fetchMfTransactions(req.params.investorId);
        res.status(200).json({
            success: true,
            data: transactions
        });
        console.log("Fetched MF Transactions Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch MF Transactions"
        });
        console.log("Failed To Fetch MF Transactions");
    }
};

const createMfTransaction = async (req: any,res: any) => {
    try {
        const transaction =
            await insertMfTransaction(
                req.body
            );
        res.status(201).json({
            success: true,
            data: transaction
        });
        console.log("Created MF Transaction Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Create MF Transaction"
        });
        console.log("Failed To Create MF Transaction");
    }
};

export {
    getMfTransactions,
    createMfTransaction
};