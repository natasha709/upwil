const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const app = express();

const PORT = process.env.PORT || 3000; // Required for Render

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/expertise', (req, res) => res.render('expertise'));
app.get('/mission', (req, res) => res.render('mission'));
app.get('/contact', (req, res) => res.redirect('/mission'));

// Image upload (optional)
app.post('/upload', upload.array('images'), (req, res) => {
  console.log('Uploaded files:', req.files);
  res.send('Images uploaded successfully');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
