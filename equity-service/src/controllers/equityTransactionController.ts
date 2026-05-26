import {
    fetchEquityTransactions,
    insertEquityTransaction
}
from "../models/equityTransactionModel";

const getEquityTransactions = async (
    req: any,
    res: any
) => {

    try {

        const { investorId } =
            req.params;

        const transactions =
            await fetchEquityTransactions(
                investorId
            );

        res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed To Fetch Transactions"
        });
    }
};

const createEquityTransaction = async (
    req: any,
    res: any
) => {

    try {

        const transaction =
            await insertEquityTransaction(
                req.body
            );

        res.status(201).json({
            success: true,
            data: transaction
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed To Create Transaction"
        });
    }
};

export {
    getEquityTransactions,
    createEquityTransaction
};