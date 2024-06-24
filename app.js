const express = require('express');
const handler = require('./request-handlers');
const app = express();
const path = require('path');
const port = 8081;
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/www'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/skills', (req, res) => {
    res.render('skills');
});

app.get('/recipe/:name', (req, res) => {
    const recipeName = req.params.name;

    handler.query('SELECT * FROM recipes WHERE name = ?', [recipeName], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Receita não encontrada');
        }
        const recipe = results[0];
        res.render('recipe', { recipe });
    });
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
