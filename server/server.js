import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS view engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});