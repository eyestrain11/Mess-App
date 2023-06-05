// importing router from express
import { Router } from "express";
import { addMenu, deleteMenu, getMenu, updateMenu } from "../controllers/menuController.js";

// importing controller functions

// create router application for taking and providing req and res
const menuRouter = Router();

// router queries
menuRouter.get("/getMenu/:menu_day" ,  getMenu)
menuRouter.post("/addMenu" , addMenu)
menuRouter.patch("/updateMenu" , updateMenu)
menuRouter.delete("/deleteMenu" , deleteMenu)

// exporting router application
export default menuRouter;