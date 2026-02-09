const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.NODE_PORT || 3000;

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

app.get('/', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM users');
        res.json({
            success: true,
            data: result.recordset,
            message: 'Data fetched successfully from MSSQL'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/health', async (req, res) => {
    try {
        await poolConnect;
        await pool.request().query('SELECT 1');
        res.json({
            status: 'OK',
            database: 'connected'
        });
    } catch (error) {
        res.status(500).json({
            database: 'disconnected',
            error: error.message
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🟢 Server started at http://0.0.0.0:${port}`);
});
