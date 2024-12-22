import express from "express"
import {userLogIn,userSignUp,adminLogIn} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post('/register',userSignUp)
userRouter.post('/login',userLogIn)
userRouter.post('/admin',adminLogIn)

export default userRouter;