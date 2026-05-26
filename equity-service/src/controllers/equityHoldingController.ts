import {
    fetchEquityHoldings,
    insertEquityHolding
}
from "../models/equityHoldingModel";

const getEquityHoldings = async (req: any,res: any) => {
    try {
        const { investorId } =
            req.params;
        const holdings =
            await fetchEquityHoldings(
                investorId
            );
        res.status(200).json({
            success: true,
            data: holdings
        });
        console.log("Fetched Equity Holdings Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Holdings"
        });
        console.log("Failed To Fetch Equity Holdings");
    }
};

const createEquityHolding = async (req: any,res: any) => {
    try {
        const holding = await insertEquityHolding(req.body);
        res.status(201).json({
            success: true,
            data: holding
        });
        console.log("Created Equity Holding Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Create Holding"
        });
        console.log("Failed To Create Equity Holding");
    }
};

export {
    getEquityHoldings,
    createEquityHolding
};