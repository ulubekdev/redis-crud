import './config.js';
import redis from 'redis';
import express from 'express';

const PORT = 5000 || process.env.PORT;
const app = express();
const client = redis.createClient(port);

app.get('/', (req, res) => {
    res.status(200).send("Working");
});

app.get('/users', (req, res) => {
    
});

app.post('/register', (req, res) => {

});

app.post('/login', (req, res) => {
    
});

app.delete('/users/:user_id', (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
});