import client from "../config/db";

export interface EquityTransactionData {
    investor_id: string;

    stock_symbol: string;

    transaction_type:
        "BUY"
        | "SELL";

    quantity: number;

    price: number;

    realized_gain?: number;

    exchange?: string;

    executed_at?: Date;
}

export interface EquityTransactionResponse {
    transaction_id: number;

    stock_symbol: string;

    company_name: string;

    transaction_type:
        "BUY"
        | "SELL";

    quantity: number;

    price: number;

    realized_gain?: number;

    exchange: string;

    executed_at: Date;
}

const fetchEquityTransactions = async (
    investorId: string
): Promise<EquityTransactionResponse[]> => {

    const sql = `
        SELECT
            et.transaction_id,
            et.stock_symbol,
            emp.company_name,
            et.transaction_type,
            et.quantity,
            et.price,
            et.realized_gain,
            et.exchange,
            et.executed_at

        FROM equity_transactions et

        JOIN equity_market_prices emp
        ON et.stock_symbol = emp.stock_symbol

        WHERE et.investor_id = $1

        ORDER BY et.executed_at DESC
    `;

    const result =
        await client.query(sql, [investorId]);

    return result.rows;
};

const insertEquityTransaction = async (
    data: EquityTransactionData
) => {

    const sql = `
        INSERT INTO equity_transactions
        (
            investor_id,
            stock_symbol,
            transaction_type,
            quantity,
            price,
            realized_gain,
            exchange,
            executed_at
        )
        VALUES (
            $1, $2, $3, $4,
            $5, $6, $7, $8
        )

        RETURNING *
    `;

    const values = [
        data.investor_id,
        data.stock_symbol,
        data.transaction_type,
        data.quantity,
        data.price,
        data.realized_gain || null,
        data.exchange || "NSE",
        data.executed_at || new Date()
    ];

    const result =
        await client.query(sql, values);

    return result.rows[0];
};

export {
    fetchEquityTransactions,
    insertEquityTransaction
};