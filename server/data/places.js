import { pool } from '../config/database.js';

const getPlaces = async () => {
    const result = await pool.query('SELECT * FROM places');
    return result.rows;
};

const getPlace = async (id) => {
    const result = await pool.query('SELECT * FROM places WHERE id = $1', [id]);
    return result.rows[0];
};

export {getPlaces, getPlace};