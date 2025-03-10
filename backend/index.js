import express, { request, response } from "express";
import { PORT, mongoDBURL } from  './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './Routes/booksRoute.js';
import cors from 'cors';


export const app = express();

app.use(express.json());

//Middleware for handling cors policy
// Option 1: Allow All Origins with Default or cors(*)
app.use(cors());

// Option 2: Allow Custom Origins

// app.use(
//     cors({
//         origin: 'hhtp://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeders: ['Content-Type'], 
//     })
// );

app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack')
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) =>{
    console.log(error);
})