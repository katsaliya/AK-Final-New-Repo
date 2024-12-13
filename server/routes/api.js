import express from 'express';
import { createVenue, getReviewsForVenues, getVenues } from '../data/venues.js';
//MUKISA

//declare router
const router = express.Router();

//get venue (TODO)
router.get('/ ', async (req, res) => {
    try{
        const venues = await getVenues();
    } catch(e){
        res.status(500).send('Error fetching venues');
    }
});

// get venueById (TODO)
router.get('/ /id', async (req, res) => {
    const venueId = parseInt(req.params.dictionary, 10);
    try{
        const venue = await getVenues(venueId);
        const reviews = await getReviewsForVenues(venueId);

        if(venue){
            res.render(' ', {
                venue: venue,
                reviews: reviews,
            });
        } else{
            res.status(404).send('Venue not found')
        }
    } catch(e){
        res.status(500).send('Error fetching venue details');
    }
});

// post venue (TODO)
router.post('/ ', async (req, res)=>{
    console.log('Recieved form data: ', req.body);
    const {name, rating, reviews, address, image} = req.body;

    try{
        const newVenueId = await createVenue({name, rating, reviews, address, image});
        console.log('Created new venue with ID: ', newVenueId);
        res.redirect(`/ /${newVenueId}`);
    } catch (e){
        console.log('Error creating venue: ', e);
        res.status(500).json({message: 'Error creating venue'});
    }
});

// delete venueById (TODO)
router.delete('/ /:id', async (req, res)=>{
    const venueId = parseInt(req.params.id, 10);

    try{
        const deletedVenue = await deletedVenue(venueId);
    } catch (e){
        res.status(500).json({message: 'Error deleting venue'});
    }
});

export {router as backendRouter};