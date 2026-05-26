import {
    fetchMarketPrices,
    fetchStockBySymbol,
    insertMarketPrice
}
from "../models/marketPriceModel";

const getMarketPrices = async (
    req: any,
    res: any
) => {

    try {

        const prices =
            await fetchMarketPrices();

        res.status(200).json({
            success: true,
            data: prices
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed To Fetch Market Prices"
        });
    }
};

const getStockBySymbol = async (
    req: any,
    res: any
) => {

    try {

        const { symbol } = req.params;

        const stock =
            await fetchStockBySymbol(symbol);

        if (!stock) {

            return res.status(404).json({
                success: false,
                message: "Stock Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: stock
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed To Fetch Stock"
        });
    }
};

const createMarketPrice = async (
    req: any,
    res: any
) => {

    try {

        const marketPrice =
            await insertMarketPrice(req.body);

        res.status(201).json({
            success: true,
            data: marketPrice
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed To Create Market Price"
        });
    }
};

export {
    getMarketPrices,
    getStockBySymbol,
    createMarketPrice
};