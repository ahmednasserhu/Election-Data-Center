import express from 'express';
import {dbConnection} from './database/dbConnection.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = 5000;

// Configure CORS to allow requests from your Angular application
const corsOptions = {
  origin: 'http://localhost:4200', // Adjust this as needed
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions))
app.use(express.json());

dbConnection();
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
