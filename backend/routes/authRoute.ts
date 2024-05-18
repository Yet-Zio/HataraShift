import { Router } from "express";
import { login, logout, register } from "../controllers/authController";

export const authRouter = Router()

// Route for User registration
authRouter.post('/register', register)

// Route for User login
authRouter.post('/login', login)

// Router for logging out user
authRouter.post("/logout", logout)