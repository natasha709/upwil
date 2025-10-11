const express = require('express');
const { connectDB } = require('./config/db');
const { saveContact } = require('./models/contact');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/expertise', (req, res) => {
    res.render('expertise');
});

app.get('/mission', (req, res) => {
    res.render('mission');
});

app.get('/contact', (req, res) => {
    res.redirect('/mission');
});

// Contact form submission
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await saveContact(name, email, message);
        res.redirect('/mission');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving contact');
    }
});

// Image upload
app.post('/upload', upload.array('images'), (req, res) => {
    console.log('Uploaded files:', req.files);
    res.send('Images uploaded successfully');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Connect to DB asynchronously
connectDB().then(() => {
    console.log('Database ready');
}).catch(() => {
    console.log('Database not available');
});