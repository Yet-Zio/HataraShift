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

// routes

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello, you are communicating with HataraShift.")
})

app.use("/api/auth", authRouter)
app.use("/api/shifts", shiftRouter)

app.use(serverErrorHandler)

app.listen(port, () => {
    console.log(`[server]: Server has started running on http://localhost:${port}`)
})