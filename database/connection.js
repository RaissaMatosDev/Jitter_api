//A conexão com o bd 
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "jitter_api",
    password: "root",
    port: 5432
});

// Coloquei este log para teste mas resolvi deixar
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err);
    } else {
        console.log('Conexão estabelecida com sucesso às:', res.rows[0].now);
    }
});
module.exports = pool;