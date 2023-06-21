import express from 'express'
import dotenv from 'dotenv'
import Connection from './database/db_connect.js';
import userRoute from './User/Routes/userRoute.js'
import menuRouter from './menu/routes/menuRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { corsOptions } from './menu/config/corsOptions.js';
import userplanRoute from './attendance/Routes/userPlanRoutes.js';
// import dailyentryRouter from './attendance/Routes/dailyentryRoute.js';
import authrouter from './auth/AuthRoute.js';
import cookieParser from 'cookie-parser';
import { protect } from './auth/AuthMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/menu", protect, menuRouter);
app.use("/users", protect, userRoute)
// app.use("/dailyentry", protect, dailyentryRouter);
app.use("/userplan", protect, userplanRoute);
app.use("/auth", authrouter);

app.listen(process.env.PORT,()=>{console.log(`Server is running...`)});

Connection();