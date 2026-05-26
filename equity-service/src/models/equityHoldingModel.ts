import client from "../config/db";

export interface EquityHoldingData {
    investor_id: string;
    stock_symbol: string;

    quantity: number;

    avg_buy_price: number;

    current_market_price: number;

    exchange?: string;
}

export interface HoldingResponse {
    holding_id: number;

    stock_symbol: string;

    company_name: string;

    quantity: number;

    avg_buy_price: number;

    current_market_price: number;

    holding_value: number;

    profit_loss: number;
}

const fetchEquityHoldings = async (
    investorId: string
): Promise<HoldingResponse[]> => {

    const sql = `
        SELECT
            eh.holding_id,
            eh.stock_symbol,
            emp.company_name,
            eh.quantity,
            eh.avg_buy_price,
            eh.current_market_price,

            (
                eh.quantity *
                eh.current_market_price
            ) AS holding_value,

            (
                (
                    eh.current_market_price -
                    eh.avg_buy_price
                )
                * eh.quantity
            ) AS profit_loss

        FROM equity_holdings eh

        JOIN equity_market_prices emp
        ON eh.stock_symbol = emp.stock_symbol

        WHERE eh.investor_id = $1

        ORDER BY holding_value DESC
    `;

    const result =
        await client.query(sql, [investorId]);

    return result.rows;
};

const insertEquityHolding = async (data: EquityHoldingData) => {
    const sql = `
        INSERT INTO equity_holdings
        (
            investor_id,
            stock_symbol,
            quantity,
            avg_buy_price,
            current_market_price,
            exchange
        )
        VALUES ($1, $2, $3, $4, $5, $6)

        RETURNING *
    `;
    const values = [
        data.investor_id,
        data.stock_symbol,
        data.quantity,
        data.avg_buy_price,
        data.current_market_price,
        data.exchange || "NSE"
    ];
    const result =
        await client.query(sql, values);
    return result.rows[0];
};

export {
    fetchEquityHoldings,
    insertEquityHolding
};