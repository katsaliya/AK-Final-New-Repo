import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { backendRouter } from './routes/api.js';
import { getReviewsForVenues, getVenues } from './data/venues.js';
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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

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

app.get('/nightlife', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'nightlife.html'));
});

// Route for rendering EJS template
// app.get('/nightlife', (req, res) => {
//     const data = {
//         title: 'Nightlife',
//         places: [{ name: 'Club A' }, { name: 'Club B' }]
//     };
//     res.render('nightlife', data); // 'nightlife' matches the file in the views folder
// });



//forms path (TODO) MUKISA
app.get('/ ', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', ' '));
});

// ejs route render for template with venue data (TODO) MUKISA
app.get(' ', async (req, res) => {
    try{
        const venues = await getVenues();
        console.log(venues);
        res.render("venues: ", {venues});
    } catch (e) {
        console.error('Error fetching venue data:', e);
        res.status(500).send('Server Error'); 
    }
});

// get venue by id with details page (TODO) MUKISA
app.get('/ /:id ', async (req, res) => {
    const venueId = parseInt(req.params.dictionary, 10);

    try {
         const venue = await getVenue(venueId);
         const reviews = await getReviewsForVenues(venueId);

    } catch (e) {
        console.log();
        res.status(500).send('Server Error');
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});