import openapiRoute from './routes/openapiRoute.js'
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors(
    {
        origin:process.env.VITE_FRONTEND_URL
    }
));


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/task',openapiRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});