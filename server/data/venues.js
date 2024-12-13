import { pool } from '../config/database.js';

const getVenues = async () => {
    const result = await pool.query('SELECT * FROM places');
    return result.rows;
};

const getVenue= async (id) => {
    const result = await pool.query('SELECT * FROM places WHERE id = $1', [id]);
    return result.rows[0];
};

const createVenue = async(newVenue) => {
    const{name, rating, review, address} = newVenue;
    try{
        const res = await pool.query(
            'INSERT INTO venue (name, rating, review, address) VALUES ($1, $2, $3, $4)',
            [name,rating,review, addres, image]
        );
        return res.rows[0].id;
    } catch(e){
        console.log('Error creating review: ', e);
        throw e;
    }
};

const deleteVenue = async(id) => {
    try{
        const res = await pool.query('DELETE FROM venues WHERE id = $1 RETURNING *', [id]);
        if(res.rows.length === 0){
            throw new Error('Venue not found')
        }
        return res.rows[0];
    } catch (e){
        console.log('Error deleting this venue: ', e);
        throw e;
    }
}

const getReviewsForVenues = async (id) => {
    try {
        const res = await pool.query("SELECT * FROM reviews WHERE venue_id = $1", [id]);
        return res.rows;
    } catch(e){
        console.log('Error fetching reviews: ', e);
        throw e;
    }
}


export {getVenues, getVenue, getReviewsForVenues, createVenue, deleteVenue};