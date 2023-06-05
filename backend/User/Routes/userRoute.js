// importing router from express
import { Router } from "express";

// importing controller functions
import { createNewUser, deleteUser, getAllUser, getOneUser, updateUser } from "../Controller/userControllers.js";

// create router application for taking and providing req and res
const router = Router();


router.post("/signup" , createNewUser)
router.get("/getusers" ,  getAllUser)
router.get("/getuser/:email" ,  getOneUser)
router.patch("/update/:id" , updateUser)
router.delete("/delete/:email" , deleteUser)

// exporting router application
export default router;