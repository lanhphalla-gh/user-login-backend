const app = require('./app');
const db = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

db.query('SELECT NOW()')
    .then(() => {
        console.log('✅ PostgreSQL Connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Database Connection Failed');
        console.error(err);
    });