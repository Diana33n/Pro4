// Import necessary libraries using CommonJS syntax
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');  // Ensure this is version 2.x
const dotenv = require('dotenv');

dotenv.config();  // Ensure environment variables are loaded

// Initialize the Express application
const app = express();

// Use CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Define the port to listen on
const port = process.env.PORT || 3000;

// Root route to check if the server is running
app.get('/', (req, res) => {
    res.send('Weather Journal App is running!');
});

// GET route to fetch weather data
app.get('/weather', async (req, res) => {
    const zip = req.query.zip; // Assumes ZIP code is provided by the client
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${data.message}`);
        }
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to fetch data');
    }
});

// POST route to receive data and respond
app.post('/data', (req, res) => {
    const userData = req.body;
    console.log(userData); // Logging the received data to the console
    res.status(200).send('Data received');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
