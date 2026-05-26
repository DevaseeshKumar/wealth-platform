import {
    fetchSips,
    insertSip
}
from "../models/mfSipModel";

const getSips = async (req: any,res: any) => {
    try {
        const sips = await fetchSips(req.params.investorId);
        res.status(200).json({
            success: true,
            data: sips
        });
        console.log("Fetched SIPs Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch SIPs"
        });
        console.log("Failed To Fetch SIPs");
    }
};

const createSip = async (req: any,res: any) => {
    try {
        const sip =
            await insertSip(req.body);
        res.status(201).json({
            success: true,
            data: sip
        });
        console.log("Created SIP Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed To Create SIP"
        });
        console.log("Failed To Create SIP");
    }
};

export {
    getSips,
    createSip
};