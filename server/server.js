import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { backendRouter } from './routes/api.js';
import { getReviewsById, getVenues, getVenuesById } from './data/reviews.js';
import { authRouter } from './auth.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//allows the parsing + renders of json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Mount the API router at the /api prefix
app.use('/api', backendRouter);
app.use("/auth", authRouter);

// Centralized error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(err.status || 500).send(err.message || 'Server Error');
});



// Routes for static HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/log-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/write-a-review', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newreview.html'));
});

// API endpoint to get all venues
app.get('/nightlife', async (req, res) => {
    try {
        const venues = await getVenues();  // Ensure this returns an array
        console.log('Venues: ', venues); // Debug log to see what is returned
        res.render('nightlife', {venues});
    } catch (error) {
        console.error('Server error:', error);
        res.status(404).send('Nightlife Server error' );  // Handle server errors
    }
});

// get venue by id with details page
    app.get('/venue/:id', async (req, res) => {
       //  const venueId = parseInt(req.params.id, 10); // Get the venueId from the URL params
       //  const venue = await getVenuesById(venueId);
       //  console.log(venue);
       // // Validate venueId
       //  if (venue) {
       //      const reviews = await getReviewsById(venueId);
       //      res.render('venueId', {
       //          venue,
       //          reviews
       //      });
       //  } else {
       //      res.status(404).send('Venue not found');
       //  }

        try{
            const venueId = parseInt(req.params.id, 10);
            console.log('Parsed venueId: ', venueId);

            if(!venueId) {
                return res.status(400).send('Invalid venue ID');
            }

            const venue = await getVenuesById(venueId);
            console.log('Fetched venue: ', venue);

            if(!venue) {
                return res.status(404).send('Venue not found');
            }

            const reviews = await getReviewsById(venueId);
            console.log('Fetched reviews: ', reviews);

            if(!reviews || !Array.isArray(reviews)) {
                console.error('Reviews is not an array: ', reviews);
                return res.status(500).send('Invalid reviews data');
            }

            res.render('venueId', {venue, reviews});
        } catch (error) {
            console.error('Error in /venue/:id route:', error);
            next(error);
        }
    });

// Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

