import express from 'express'
import dotenv from 'dotenv'
import Connection from './database/db_connect.js';
import userRoute from './User/Routes/userRoute.js'
import menuRouter from './menu/routes/menuRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { corsOptions } from './menu/config/corsOptions.js';
import userplanRoute from './attendance/Routes/userPlanRoutes.js';
import dailyentryRouter from './attendance/Routes/dailyentryRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/menu", menuRouter);
app.use("/users",userRoute)
app.use("/dailyentry",dailyentryRouter);
app.use("/userplan",userplanRoute);

app.listen(process.env.PORT,()=>{console.log(`Server is running...`)});

Connection();