import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'bio_icare_drone',
    password: 'admin',
    port: 5432,
});

export { client }