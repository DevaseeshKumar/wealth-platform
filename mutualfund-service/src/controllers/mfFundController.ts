import {
    fetchMutualFunds,
    insertMutualFund
}
from "../models/mfFundModel";

const getMutualFunds = async (req: any,res: any) => {
    try {
        const funds =await fetchMutualFunds(req.params.investorId);
        res.status(200).json({
            success: true,
            data: funds
        });
        console.log("Fetched Mutual Funds Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Mutual Funds"
        });
        console.log("Failed To Fetch Mutual Funds");
    }
};

const createMutualFund = async (req: any,res: any) => {
    try {
        const fund = await insertMutualFund(req.body);
        res.status(201).json({
            success: true,
            data: fund
        });
        console.log("Created Mutual Fund Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Create Mutual Fund"
        });
        console.log("Failed To Create Mutual Fund");
    }
};

export {
    getMutualFunds,
    createMutualFund
};