const express = require('express');
const handler = require('./request-handlers');
const app = express();
const port = 8081;
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/www'));

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/api/recipes', (req, res) => {
    handler.query('SELECT * FROM recipes', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
