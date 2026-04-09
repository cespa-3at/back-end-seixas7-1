const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Prepara o servidor para ler os dados do formulário
app.use(express.urlencoded({ extended: true }));
const db = new sqlite3.Database('./sistema.db');

// Rota para abrir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota que recebe os dados e salva no SQLite
app.post('/salvar', (req, res) => {
    const { nome, cidade } = req.body;
    const sql = `INSERT INTO usuarios (nome, cidade) VALUES (?, ?)`;

    db.run(sql, [nome, cidade], (err) => {
        if (err) return res.send("Erro ao salvar: " + err.message);
        res.send("<h3> Sucesso! Dados salvos no banco.</h3><a href='/'>Voltar</a>");
    });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
