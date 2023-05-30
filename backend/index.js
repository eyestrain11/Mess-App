import express from 'express'
import dotenv from 'dotenv'

import Connection from './database/db_connect.js';

dotenv.config();

const app = express();

app.listen(process.env.PORT,()=>{console.log(`Server is running...`)});

Connection();