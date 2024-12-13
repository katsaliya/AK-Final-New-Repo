import { pool } from '../config/database.js';
// MUKISA

const getReviews = async () => {
    try {
        const res = await pool.query(
            'SELECT * FROM reviews WHERE venues_id = $1 ORDER BY id ASC',
        );
        return res.rows[0]; // Returns the first matching review or undefined if not found
    } catch (error) {
        console.error('Error fetching reviews under venue:', error);
        throw error;
    }
};

const getReviewById = async (venueId, reviewId) => {
    try {
        const res = await pool.query(
            'SELECT * FROM reviews WHERE venues_id = $1 AND id = $2',
            [venueId, reviewId]
        );
        return res.rows[0]; // Returns the first matching review or undefined if not found
    } catch (error) {
        console.error('Error fetching review by ID under venue:', error);
        throw error;
    }
};

const createReview = async(venueId, reviewData) => {
    const { reviewText, rating } = reviewData; // Extract review details from the input

    try {
        const res = await pool.query(
            'INSERT INTO reviews (venues_id, review_text, rating) VALUES ($1, $2, $3) RETURNING *',
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
            'DELETE FROM reviews WHERE venues_id = $1 AND id = $2 RETURNING *',
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
        const res = await pool.query(
            'SELECT * FROM venues ORDER BY ID ASC',
        );
        return res.rows[0]; // Returns the venue if found, otherwise undefined
    } catch (error) {
        console.error('Error fetching venues:', error);
        throw error;
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

export {getReviewById, getReviews, createReview, deleteReview, getVenues, getVenuesById};