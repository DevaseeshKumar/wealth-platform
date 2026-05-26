import client from "../config/db";

export interface MarketPriceData {
    stock_symbol: string;
    company_name: string;
    current_price: number;
    day_change_percent: number;
    exchange?: string;
    updated_at?: Date;
}

const fetchMarketPrices = async () => {
    const sql = `
        SELECT *
        FROM equity_market_prices
        ORDER BY company_name
    `;
    const result = await client.query(sql);
    return result.rows;
};

const fetchStockBySymbol = async (stockSymbol: string) => {
    const sql = `
        SELECT *
        FROM equity_market_prices
        WHERE stock_symbol = $1
    `;
    const result = await client.query(sql, [stockSymbol]);
    return result.rows[0];
};

const insertMarketPrice = async (data: MarketPriceData) => {

    const sql = `
        INSERT INTO equity_market_prices
        (
            stock_symbol,
            company_name,
            current_price,
            day_change_percent,
            exchange
        )
        VALUES ($1, $2, $3, $4, $5)

        RETURNING *
    `;

    const values = [
        data.stock_symbol,
        data.company_name,
        data.current_price,
        data.day_change_percent,
        data.exchange || "NSE"
    ];

    const result =
        await client.query(sql, values);

    return result.rows[0];
};

export {
    fetchMarketPrices,
    fetchStockBySymbol,
    insertMarketPrice
};