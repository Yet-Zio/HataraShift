import express, { Express, Request, Response} from "express";
import dotenv from "dotenv";
import compression from "compression";
import serverCors from "./utils/cors";
import cookieParser from "cookie-parser";

dotenv.config({path: "./config/.env.backend"})

import { connectToMongo } from "./config/db";
import { serverErrorHandler } from "./utils/errorHandler";
import { authRouter } from "./routes/authRoute";
import { shiftRouter } from "./routes/shiftRoute";

const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.use(serverCors)
app.use(express.json())
app.use(cookieParser())
app.use(compression())

connectToMongo()

// Routes

app.get("/", async (req: Request, res: Response) => {
    res.status(200).send("Hello, you are communicating with HataraShift, the shift booking system.")
})

app.use("/api/auth", authRouter)
app.use("/api/shifts", shiftRouter)

app.get("*", async (req: Request, res: Response) => {
    res.status(404).send("Sorry but this route doesn't exist!")
})

// Error handler for every error that occurs within the server
app.use(serverErrorHandler)

app.listen(port, () => {
    console.log(`[server]: Server has started running on http://localhost:${port}`)
})