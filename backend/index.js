import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/route.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // port frontend
    credentials: true,
}));

app.use(cookieParser());

//  parsing JSON body
app.use(express.json());

// pasang router
app.use(router);

// jalankan server
app.listen(5000, () => console.log('Server is up and running'));
