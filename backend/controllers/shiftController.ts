import { NextFunction, Request, Response } from "express";
import { Shift } from "../models/Shift";
import { errorHandler } from "../utils/errorHandler";
import { AuthenticatedRequest, ShiftBody } from "../types";
import { User } from "../models/User";

/**
 * This method helps users create shifts with the following information: the date, start time, end time and role
 * @param req.body An authenticated request body which should contain date, startTime, endTime and role.
 * @returns Once the method succeeds, it returns the shiftId of the newly created Shift document.
 */
export const createShift = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const { date, startTime, endTime, role } : ShiftBody = req.body

        if(!(date && startTime && endTime && role)){
            return next(errorHandler(409, "Cannot create shift: One or more missing attributes or empty attributes found."))
        }

        const user = req.user

        const availableUser = await User.findById(user.id)

        if(!availableUser){
            return next(errorHandler(404, "User does not exist to create this shift!"))
        }
        
        const newshift = await Shift.create({
            date: new Date(date), startTime, endTime, role, 
        })

        return res.status(201).json({shiftId: newshift.id})
    }
    catch(err){
        return next(errorHandler)
    }
}

/**
 * This method helps users view the available shifts that have not been booked yet.
 * @param req.user An authenticated request which should contain the user information provided by JWT middleware.
 * @returns A collection of available shift documents or an empty array if there are no more available shifts.
 */
export const availableShifts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        const availableUser = await User.findById(user.id)

        if(!availableUser){
            return next(errorHandler(404, "User does not exist to view available shifts!"))
        }

        const availableShifts = await Shift.find({bookedBy: null})

        return res.status(200).json(availableShifts)
    }
    catch(err){
        return next(errorHandler)
    }
}

/**
 * This method helps users book shifts based on a provided shiftId
 * @param req.user An authenticated request which should contain the user information provided by JWT middleware.
 * @param req.params.shiftId A shiftId should be present as route parameter for identifying the shift to be booked.
 * @returns A message with shiftId if the shift is successfully booked, else a message with conflict(409) status code.
 */
export const bookShift = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        const availableUser = await User.findById(user.id)

        if(!availableUser){
            return next(errorHandler(404, "User does not exist to book shifts!"))
        }

        const shiftId = req.params.shiftId

        if(!shiftId){
            return next(errorHandler(409, "Shift ID cannot be empty!"))
        }

        const bookShift = await Shift.findById(shiftId)
        
        if(!bookShift){
            return next(errorHandler(404, "A shift with this shiftId does not exist!"))
        }

        if(bookShift.bookedBy != null){
            return res.status(409).json({success: false, shiftId, message: `Shift has already been booked.`})
        }
        
        bookShift.bookedBy = availableUser._id

        await bookShift.save()
        return res.status(200).json({success: true, message: "Shift booked successfully!", shiftId})

    }
    catch(err){
        return next(errorHandler)
    }
}

/**
 * This method helps users view their booked shifts
 * @param req.user An authenticated request which should contain the user information provided by JWT middleware.
 * @returns A collection of booked shift documents based on the user or an empty array if there are no booked shifts.
 */
export const viewBookedShifts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        const availableUser = await User.findById(user.id)

        if(!availableUser){
            return next(errorHandler(404, "User does not exist to view booked shifts!"))
        }

        const bookedShifts = await Shift.find({bookedBy: availableUser._id})

        return res.status(200).json(bookedShifts)
    }
    catch(err){
        return next(errorHandler)
    }
}

/**
 * This method helps users cancel their booked shifts based on a provided shiftId
 * @param req.user An authenticated request which should contain the user information provided by JWT middleware.
 * @param req.params.shiftId A shiftId should be present as route parameter for identifying the shift to be cancelled.
 * @returns A message with shiftId if the shift is successfully cancelled, else a message with conflict(409) status code.
 */
export const cancelBookedShift = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        const availableUser = await User.findById(user.id)

        if(!availableUser){
            return next(errorHandler(404, "User does not exist to view booked shifts!"))
        }

        const shiftId = req.params.shiftId

        if(!shiftId){
            return next(errorHandler(409, "Shift ID cannot be empty!"))
        }

        const bookedShift = await Shift.findById(shiftId)
        
        if(!bookedShift){
            return next(errorHandler(404, "A shift with this shiftId does not exist!"))
        }

        if(bookedShift.bookedBy != null){
            if(bookedShift.bookedBy.equals(availableUser._id)){
                bookedShift.bookedBy = null
                await bookedShift.save()
                return res.status(200).json({success: true, shiftId, message: "Booking has been cancelled!"})
            }
            else{
                return res.status(401).json({success: false, shiftId, message: "You are not allowed to cancel this booking!"})
            }
        }
        else{
            return res.status(409).json({success: false, shiftId, message: "The shift was not booked previously to be cancelled!"})
        }
        
    }
    catch(err){
        return next(errorHandler)
    }
}