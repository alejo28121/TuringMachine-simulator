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

exports.register = async (name, email, password) => {
    try {

        const checkQuery = `
            SELECT id
            FROM users
            WHERE email = $1
        `;

        const checkResult = await connection.query(checkQuery, [email]);

        if (checkResult.rows.length > 0) {
            throw new Error('USER_EXISTS');
        }


        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const insertQuery = `
            INSERT INTO users (name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, name, email
        `;

        const result = await connection.query(insertQuery, [
            name,
            email,
            hash
        ]);

        const user = result.rows[0];

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const jwtKey = process.env.JWTKEY;

        const token = jwt.sign(
            payload,
            jwtKey,
            { expiresIn: '1h' }
        );

        return token;

    } catch (error) {

        if (error.message === 'USER_EXISTS') {
            throw error;
        }

        console.error('DB ERROR:', error);
        throw new Error('DB_ERROR');
    }
};