// Server setup (Express.js) and routing
const express = require('express');
const path = require('path');
const fs = require('fs');

// Create an instance of the express app and setup port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// TODO: Add API routes later

// Start the server and console log the port for the user
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
