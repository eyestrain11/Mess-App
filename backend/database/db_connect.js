import mongoose from "mongoose";
console.log("Welcome to mongoose");
import dotenv from 'dotenv'


dotenv.config({path:'../config.env'})


const Connection = async () => {
  console.log("go to db connect");
  await mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connection Successfull')
  }).catch((e)=> {
    console.log('Error of db :',e);
  })

};

export default Connection;
