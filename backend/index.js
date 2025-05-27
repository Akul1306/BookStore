import express from "express";    // for express package
 import {PORT, mongoDBURL} from "./config.js";    // for Port from config.js
 import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

 const app = express();

 //Middleware for parsing request body
 app.use(express.json());    //it will allow express to use json body

 //Middleware for handling cors policy
 // 1: Allow all origins with default of cors(*)
 app.use(cors());

 //2: Allow custom origins
//  app.use(cors({
//     origin: 'http://localhost:3000',
//     mathod: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-type'],
//  }));

 app.get('/',(request,response) => {
    console.log(request);
    return  response.status(234).send('Welcome to MERN stack');
 });

app.use('/',booksRoute);

mongoose.connect(mongoDBURL)      //mongoose.connect to connect to db on the mongo url
.then(()=>{
console.log('App connected to database');
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);});
    
})
.catch((error)=>{
console.log(error);
});