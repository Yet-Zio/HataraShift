import { Request } from "express"

export interface AuthenticatedRequest extends Request{
    user?: any
}

export interface AuthBody{
    name?: string,
    email: string,
    password: string
}

export interface ShiftBody{
    date: string,
    startTime: string,
    endTime: string,
    role: string
}