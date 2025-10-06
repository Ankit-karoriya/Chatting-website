import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config()

const port = process.env.PORT || 4000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running on port: ', port);
        })
    })
    .catch((error) => {
        console.log('MongoDB failed to connect: ', error);
    })