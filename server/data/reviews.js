import { pool } from '../config/database.js';


const getReviewsById = async (venueId) => {
    try {
        const res = await pool.query('SELECT * FROM reviews WHERE venue_id = $1', [venueId])
        console.log('Reviews fetched: ', res.rows);
        return res.rows;
    } catch (error) {
        console.error('Error fetching reviews by venue ID:', error.message);
    }
};

const createReview = async(venueId, reviewData) => {
    const { reviewText, rating } = reviewData; // Extract review details from the input

    try {
        const res = await pool.query(
            'INSERT INTO reviews (venue_id, review_text, rating) VALUES ($1, $2, $3) RETURNING *',
            [venueId, reviewText, rating]
        );
        return res.rows[0]; // Return the newly created review
    } catch (error) {
        console.error('Error creating review under venue:', error);
        throw error;
    }
};

const deleteReview = async(venueId, reviewId) => {
    try {
        const res = await pool.query(
            'DELETE FROM reviews WHERE venue_id = $1 AND id = $2 RETURNING *',
            [venueId, reviewId]
        );
        if (res.rowCount === 0) {
            return { success: false, message: 'Review not found for the given venue.' };
        }
        return { success: true, review: res.rows[0] }; // Returns the deleted review
    } catch (error) {
        console.error('Error deleting review under venue:', error);
        throw error;
    }
}

const getVenues = async () => {
    try {
        const results = await pool.query('SELECT * FROM venues ORDER BY id ASC');
        return results.rows; // Returns the venue if found, otherwise undefined
    } catch (error) {
        console.error(error.message)
    }
};

const getVenuesById = async (id) => {
    try {
        const res = await pool.query(
            'SELECT * FROM venues WHERE id = $1',
            [id]
        );
        return res.rows[0]; // Returns the venue if found, otherwise undefined
    } catch (error) {
        console.error('Error fetching venue:', error);
        throw error;
    }
};

export {getReviewsById, createReview, deleteReview, getVenues, getVenuesById};