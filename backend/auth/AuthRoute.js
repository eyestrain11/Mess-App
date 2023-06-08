import { Router } from 'express'
import { login, refresh, logout } from './AuthController.js'
const authrouter = Router()

authrouter.post("/login" , login)
authrouter.get("/refresh" , refresh)
authrouter.get("/logout" , logout)


// router.route('/logout')
    // .post(authController.logout)

export default authrouter;