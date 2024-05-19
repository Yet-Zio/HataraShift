import { ChangeEvent, FormEvent, useState } from 'react';
import { API_URL } from '../../../constants';
import axios from 'axios';
import { useHS_Dispatch } from '../../../redux/hooks';
import { changesubmit, initialState } from '../../../redux/dashboard/shiftSubmitSlice';

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const convertTo12HourFormat = (time: string) => {
    let [hours, minutes] = time.split(':');
    let period = 'AM';
    let hoursNum = parseInt(hours);

    if (hoursNum >= 12) {
        period = 'PM';
        if (hoursNum > 12) {
            hoursNum -= 12;
        }
    } else if (hoursNum === 0) {
        hoursNum = 12;
    }

    return `${hoursNum.toString().padStart(2, '0')}:${minutes} ${period}`;
}

export default function CreateShifts() {

    const [shiftDetails, setShiftDetails] = useState({date: formatDate(new Date()), startTime: "", endTime: "", role: "Nurse"})
    const [localStartTime, setLocalStartTime] = useState("")
    const [localEndTime, setLocalEndTime] = useState("")

    const dispatch = useHS_Dispatch()

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShiftDetails(prevState => ({
            ...prevState,
            date: e.target.value
        }))
    }

    const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setLocalStartTime(time)

        const formattedTime = convertTo12HourFormat(time);
        setShiftDetails(prevState => ({
            ...prevState,
            startTime: formattedTime
        }))
        console.log(shiftDetails)
    }

    const handleEndTime = (e: ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setLocalEndTime(time)

        const formattedTime = convertTo12HourFormat(time);
        setShiftDetails(prevState => ({
            ...prevState,
            endTime: formattedTime
        }))
        console.log(shiftDetails)
    }

    const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setShiftDetails(prevState => ({
            ...prevState,
            role: e.target.value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        dispatch(changesubmit({
            ...initialState,
            start: true
        }))
        await axios.post(`${API_URL}/api/shifts`, shiftDetails,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(response => {
            dispatch(changesubmit({
                ...initialState,
                start: true,
                success: true,
                done: true,
                message: "Shift created successfully!"
            }))
        }).catch(err => {
            dispatch(changesubmit({
                ...initialState,
                start: true,
                success: false,
                done: true,
                submitres: err.response.data.message
            }))
        })
    }

  return (
    <div className='flex w-screen min-h-screen bg-transparent'>
      <div className='flex flex-col w-full'>
        <p className='text-2xl useinter ps-5 pt-5 text-black font-bold'>Create Shifts</p>
        <form className="flex flex-col w-full relative useroboto mt-7" onSubmit={handleSubmit}>
            <div className="flex"><label htmlFor="date" className='font-semibold'>Date: </label></div>
            <input className="w-44 mt-2 border border-slate-400 rounded-lg p-1" type="date" id="date" value={shiftDetails.date} onChange={handleDateChange} required/>

            <div className="flex"><label htmlFor="startTime" className='mt-5 font-semibold'>Start Time: </label></div>
            <input className="w-44 border mt-2 border-slate-400 rounded-lg p-1" type="time" id="startTime" value={localStartTime} onChange={handleStartTime} required/>

            <div className="flex"><label htmlFor="endTime" className='mt-5 font-semibold'>End Time: </label></div>
            <input className="w-44 border mt-2 border-slate-400 rounded-lg p-1" type="time" id="endTime" value={localEndTime} onChange={handleEndTime} required/>

            <div className="flex"><label htmlFor="role" className='mt-5 font-semibold'>Role: </label></div>
            <select className="w-44 border mt-2 border-slate-400 rounded-lg p-1" id="role" value={shiftDetails.role} onChange={handleRoleChange} required>
                <option value="Nurse">Nurse</option>
                <option value="Caregiver">Caregiver</option>
                <option value="Doctor">Doctor</option>
                <option value="Pharmacist">Pharmacist</option>
            </select>
            <button type="submit" className='p-2 ps-5 pe-5 rounded-xl bg-purple-500 w-44 mt-6 text-white hover:bg-purple-500/75'>Create</button>
        </form>
      </div>
    </div>
  )
}
