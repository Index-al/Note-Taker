// Server setup (Express.js) and routing
const express = require('express');
const path = require('path');
const fs = require('fs');

// Create an instance of the express app and setup port
const app = express();
const PORT = process.env.PORT || 3000;

// Path const for db.json
const dbPath = path.join(__dirname, 'Develop/db/db.json');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./Develop/public'));

// Direct the user to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// Direct the user to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

// Setup API routes
app.get('/api/notes', (req, res) => {
    // Read the `db.json` file and return all saved notes as JSON
    try {
        const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error reading notes" });
    }
});

app.post('/api/notes', (req, res) => {
    // Receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client
    try {
        const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const newNote = req.body;
        newNote.id = notes.length + 1;
        notes.push(newNote);
        fs.writeFileSync(dbPath, JSON.stringify(notes, null, 4));
        res.json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error saving the note" });
    }
});

app.delete('/api/notes/:id', (req, res) => {
    // Delete a note from the `db.json` file by its `id` property
    try {
        const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const updatedNotes = notes.filter((note) => note.id !== parseInt(req.params.id));
        fs.writeFileSync(dbPath, JSON.stringify(updatedNotes, null, 4));
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting the note" });
    }
});

// Start the server and console log the port for the user
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
