const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/database.js');
require('dotenv').config();

exports.login = async (user, password) => {
    try {

        const query = `
            SELECT
                id,
                name,
                email,
                password_hash
            FROM users
            WHERE email = $1
        `;
        const result = await connection.query(query, [user]);
        const rows = result.rows;

        if (rows.length === 0) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const hash = rows[0].password_hash;

        const valid = await bcrypt.compare(password, hash);
        if (!valid) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const payload = {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email
        };
        const jwtKey = process.env.JWTKEY;

        const token = jwt.sign(
            payload,
            jwtKey,
            { expiresIn: '1h' }
        );

        return token;

    } catch (error) {

        if (error.message === 'INVALID_CREDENTIALS') {
            throw error;
        }

        console.error('DB ERROR:', error);

        throw new Error('DB_ERROR');
    }
};