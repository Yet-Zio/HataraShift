import { Router } from "express";
import { login, register } from "../controllers/authController";

export const authRouter = Router()

// Route for User registration
authRouter.post('/register', register)

// Route for User login
authRouter.post('/login', login)