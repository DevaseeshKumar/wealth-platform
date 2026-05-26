import client from "../config/db";

export interface MutualFundData {
    investor_id: string;

    scheme_code: string;

    scheme_name: string;

    amc_name: string;

    fund_category?: string;

    risk_category?: string;

    units: number;

    invested_amount: number;

    current_value: number;

    nav_value?: number;

    investment_date: Date;
}

export interface MutualFundResponse {
    fund_id: number;

    scheme_code: string;

    scheme_name: string;

    amc_name: string;

    fund_category?: string;

    risk_category?: string;

    units: number;

    invested_amount: number;

    current_value: number;

    nav_value?: number;

    profit_loss: number;
}

const fetchMutualFunds = async (
    investorId: string
): Promise<MutualFundResponse[]> => {

    const sql = `
        SELECT
            fund_id,
            scheme_code,
            scheme_name,
            amc_name,
            fund_category,
            risk_category,
            units,
            invested_amount,
            current_value,
            nav_value,

            (
                current_value -
                invested_amount
            ) AS profit_loss

        FROM mf_customer_funds

        WHERE investor_id = $1

        ORDER BY current_value DESC
    `;

    const result = await client.query(sql, [investorId]);
    return result.rows;
};

const insertMutualFund = async (
    data: MutualFundData
) => {

    const sql = `
        INSERT INTO mf_customer_funds
        (
            investor_id,
            scheme_code,
            scheme_name,
            amc_name,
            fund_category,
            risk_category,
            units,
            invested_amount,
            current_value,
            nav_value,
            investment_date
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11
        )

        RETURNING *
    `;

    const values = [
        data.investor_id,
        data.scheme_code,
        data.scheme_name,
        data.amc_name,
        data.fund_category || null,
        data.risk_category || null,
        data.units,
        data.invested_amount,
        data.current_value,
        data.nav_value || null,
        data.investment_date
    ];

    const result = await client.query(sql, values);

    return result.rows[0];
};

export {
    fetchMutualFunds,
    insertMutualFund
};