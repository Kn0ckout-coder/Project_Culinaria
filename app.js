const express = require('express');
const handler = require('./request-handlers');
const app = express();
const port = 8081;

app.use(express.static("www"));

app.get('/api/recipes', (req, res) => {
    handler.query('SELECT * FROM recipes', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
