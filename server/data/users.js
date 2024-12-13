import { pool } from "../config/database.js";

const getUser = async (user) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE username=1;', {user})
        if(res.rows.length === 0){
            throw new Error("user not found");
        } 
        return res.rows[0];
    } catch(e) {
        console.error(e.message);
    }
};

const createUser = async (user, hashedPassword) => {
    try {
        const res = await pool.query('INSERT INTO users (username, hashedPassword) VALUES ($1, $2);', [user, hashedPassword]);
        return res.rows[0];
    } catch (e) {
        console.error(e.message);
    }
};

export {getUser, createUser};