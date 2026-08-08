
// npm install cors
const express = require('express');
const cors = require('cors');
const app = express();
app.get('/', (req, res) => {
    res.send('API is running');
});
const routes = require('./routes/router.routes');


// ========================================
// CORS
// ========================================

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// ========================================
// Body Parser
// ========================================

app.use(express.json());



// ========================================
// Routes
// ========================================

app.use('/api/auth', routes);

// ========================================
// Test
// ========================================

app.get('/', (req, res) => {

    res.json({
        message: 'API is running'
    });

});

module.exports = app;