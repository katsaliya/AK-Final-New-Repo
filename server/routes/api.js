import express from 'express';
import { createReview, deleteReview } from '../data/reviews.js';
import { getVenuesById } from '../data/reviews.js';
import { getReviewById } from '../data/reviews.js';
//MUKISA

//declare router
const router = express.Router();

// API endpoint to get all reviews under a venue
router.get('/venues/:venueId/reviews', async (req, res) => {
    const venueId = parseInt(req.params.venueId, 10);

    // Validate input
    if (isNaN(venueId)) {
        return res.status(400).json({ error: 'Invalid venue ID' });
    }

    try {
        const reviews = await getAllReviewsUnderVenue(venueId);
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ error: 'No reviews found for the given venue' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// get reviewById (TODO)
router.get('/venues/:venueId/reviews/:reviewId', async (req, res) => {
    const venueId = parseInt(req.params.venueId, 10);
    const reviewId = parseInt(req.params.reviewId, 10);

    // Validate input
    if (isNaN(venueId) || isNaN(reviewId)) {
        return res.status(400).json({ error: 'Invalid venue ID or review ID' });
    }

    try {
        const review = await getReviewById(venueId, reviewId);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found for the given venue' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the review' });
    }
});

// post venue (TODO)
router.post('/venues/:id/reviews', async (req, res) => {
    const venueId = parseInt(req.params.id, 10);
    const { reviewText, rating } = req.body;

    if (!reviewText || typeof rating !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const createdReview = await createReview(venueId, { reviewText, rating });
        res.status(201).json(createdReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
});

// delete reviewById (TODO)
router.delete('/venues/:venueId/reviews/:id', async (req, res)=>{
    const venueId = parseInt(req.params.venueId, 10);
    const reviewId = parseInt(req.params.reviewId, 10);

    if (isNaN(venueId) || isNaN(reviewId)) {
        return res.status(400).json({ error: 'Invalid venue or review ID' });
    }

    try {
        const result = await deleteReview(venueId, reviewId);
        if (result.success) {
            res.status(200).json(result.review);
        } else {
            res.status(404).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
});



export {router as backendRouter};