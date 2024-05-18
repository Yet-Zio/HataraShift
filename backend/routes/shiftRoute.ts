import { Request, Response, Router } from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { availableShifts, bookShift, cancelBookedShift, createShift, viewBookedShifts } from "../controllers/shiftController";

export const shiftRouter = Router()

// Route for creating a new shift
shiftRouter.post("", authenticateJWT, createShift)

// Route for getting available shifts
shiftRouter.get("/available", authenticateJWT, availableShifts)

// Route for booking a shift
shiftRouter.post("/book/:shiftId", authenticateJWT, bookShift)

// Route for getting all booked shifts
shiftRouter.get("/booked", authenticateJWT, viewBookedShifts)

// Route for cancelling a booking
shiftRouter.delete("/book/:shiftId", authenticateJWT, cancelBookedShift)