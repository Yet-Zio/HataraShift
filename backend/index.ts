import express, { Express, Request, Response} from "express";
import dotenv from "dotenv"
import compression from "compression";
import cookieParser from "cookie-parser";

dotenv.config({path: "./config/.env.backend"})

import { connectToMongo } from "./config/db";

const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(compression())

connectToMongo()

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello, you are communicating with HataraShift.")
})

app.listen(port, () => {
    console.log(`[server]: Server has started running on http://localhost:${port}`)
})