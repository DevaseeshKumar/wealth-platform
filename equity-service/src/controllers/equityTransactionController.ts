import {
    fetchEquityTransactions,
    insertEquityTransaction
}
from "../models/equityTransactionModel";

const getEquityTransactions = async (req: any,res: any) => {
    try {
        const { investorId } = req.params;
        const transactions = await fetchEquityTransactions(investorId);
        res.status(200).json({
            success: true,
            data: transactions
        });
        console.log("Fetched Equity Transactions Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Transactions"
        });
        console.log("Failed To Fetch Equity Transactions");
    }
};

const createEquityTransaction = async (req: any,res: any) => {
    try {
        const transaction = await insertEquityTransaction(req.body);
        res.status(201).json({
            success: true,
            data: transaction
        });
        console.log("Created Equity Transaction Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Create Transaction"
        });
        console.log("Failed To Create Equity Transaction");
    }
};

export {
    getEquityTransactions,
    createEquityTransaction
};