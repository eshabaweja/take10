import openapiRoute from './routes/openapiRoute.js'
import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/task',openapiRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});