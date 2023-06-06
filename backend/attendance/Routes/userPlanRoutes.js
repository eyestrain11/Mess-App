import { Router } from "express";
import { getConsent , getTodayStudents , updateConsent , getUserCurrentPlan} from "../Controller/userPlanController.js";


const userplanRoute = Router();


userplanRoute.get("/getTodayStudent/:type" ,  getTodayStudents)
userplanRoute.get("/getConsent/:obj" ,  getConsent)
userplanRoute.patch("/updateConsent" , updateConsent)
userplanRoute.get("/getusercurrentplan/:userId" ,getUserCurrentPlan)

export default userplanRoute;