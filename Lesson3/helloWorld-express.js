const express = require('express'); // Import the express module

const app = express(); // Create an express application
const port = 3000; // Set the port number

// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
})

// -- Taking in URL parameters --
// GET http://example.com/api?id=123

app.get('/api', (req, res) => {
    res.send(`ID: ${req.query.id}`);
}

// POST https://example.com/api     { "id": 123, "val": "hello!" }
app.post('/api', (req, res) => {
    res.send(`ID: ${req.body.id}, VAL: ${req.body.val}`);
}

