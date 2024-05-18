import { NextFunction, Request, Response } from "express";
import { Shift } from "../models/Shift";
import { errorHandler } from "../utils/errorHandler";
import { AuthenticatedRequest, ShiftBody } from "../types";
import { User } from "../models/User";

export const createShift = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const { date, startTime, endTime, role } : ShiftBody = req.body

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