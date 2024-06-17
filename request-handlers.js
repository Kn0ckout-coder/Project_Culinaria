const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'recipes'
});

database.connect((err) => {
    if (err) {
        console.error('Erro ao conectar à base de dados:', err);
        return;
    }
    console.log('A conectar à base de dados.');
});

module.exports = database;


