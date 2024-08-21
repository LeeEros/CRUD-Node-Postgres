const Conexaobanco = require("pg").Pool;

const pool = new Conexaobanco({
    user: 'postgres',
    host: 'localhost',
    database: 'project',
    password: 'postgres',
    port: 5432
});
