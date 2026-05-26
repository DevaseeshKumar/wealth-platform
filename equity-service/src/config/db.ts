import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
    .then(() => {

        console.log(
            " PostgreSQL Connected Successfully"
        );

    })
    .catch((err) => {

        console.log(
            " PostgreSQL Connection Failed"
        );

        console.log(err);
    });

export default client;