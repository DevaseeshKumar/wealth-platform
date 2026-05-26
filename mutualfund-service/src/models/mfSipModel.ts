import client from "../config/db";

export interface SipData {
    investor_id: string;

    scheme_code: string;

    scheme_name: string;

    sip_amount: number;

    sip_status:
        | "ACTIVE"
        | "PAUSED"
        | "FAILED"
        | "CANCELLED";

    start_date: Date;

    next_due_date?: Date;
}

const fetchSips = async (
    investorId: string
) => {

    const sql = `
        SELECT *
        FROM mf_sips

        WHERE investor_id = $1

        ORDER BY next_due_date ASC
    `;

    const result = await client.query(sql, [investorId]);

    return result.rows;
};

const insertSip = async (
    data: SipData
) => {

    const sql = `
        INSERT INTO mf_sips
        (
            investor_id,
            scheme_code,
            scheme_name,
            sip_amount,
            sip_status,
            start_date,
            next_due_date
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
        data.scheme_name,
        data.sip_amount,
        data.sip_status,
        data.start_date,
        data.next_due_date || null
    ];

    const result = await client.query(sql, values);

    return result.rows[0];
};

export {
    fetchSips,
    insertSip
};