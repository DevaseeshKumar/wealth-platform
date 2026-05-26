import client from "../config/db";

export interface MfTransactionData {
    investor_id: string;

    scheme_code: string;

    transaction_type:
        | "PURCHASE"
        | "REDEMPTION";

    amount: number;

    units?: number;

    redemption_status?: string;

    executed_at?: Date;
}

const fetchMfTransactions = async (
    investorId: string
) => {

    const sql = `
        SELECT *
        FROM mf_transactions

        WHERE investor_id = $1

        ORDER BY executed_at DESC
    `;

    const result = await client.query(sql, [investorId]);

    return result.rows;
};

const insertMfTransaction = async (
    data: MfTransactionData
) => {
    const sql = `
        INSERT INTO mf_transactions
        (
            investor_id,
            scheme_code,
            transaction_type,
            amount,
            units,
            redemption_status,
            executed_at
        )
        VALUES (
            $1, $2, $3, $4,
            $5, $6, $7
        )

        RETURNING *
    `;

    const values = [
        data.investor_id,
        data.scheme_code,
        data.transaction_type,
        data.amount,
        data.units || null,
        data.redemption_status || null,
        data.executed_at || new Date()
    ];

    const result = await client.query(sql, values);

    return result.rows[0];
};

export {
    fetchMfTransactions,
    insertMfTransaction
};