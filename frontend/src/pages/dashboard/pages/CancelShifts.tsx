import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { API_URL } from "../../../constants"
import { motion } from "framer-motion"
import { CaretDown } from "@phosphor-icons/react"
import { useHS_Dispatch } from "../../../redux/hooks"
import { changesubmit, initialState } from "../../../redux/dashboard/shiftSubmitSlice"

export default function CancelShifts() {

    const [bookedShifts, setBookedShifts] = useState<Shift[]>([])
    const [selectedShift, setSelectedShift] = useState("1")
    const [showDetails, setShowDetails] = useState(false)

    const dispatch = useHS_Dispatch()

    useEffect(() => {
        const getBookedShifts = async () => {
            await axios.get(`${API_URL}/api/shifts/booked`, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            }).then(response => {
                
                setBookedShifts(response.data)

            }).catch(err => {
              console.log(err)
            })
          }
        
        getBookedShifts()
    }, [])

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr)

        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth() + 1).padStart(2, '0')
        const day = String(date.getUTCDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const shiftId = bookedShifts[parseInt(selectedShift) - 1]._id

        dispatch(changesubmit({
            ...initialState,
            start: true
        }))
        await axios.delete(`${API_URL}/api/shifts/book/${shiftId}`,{
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
                message: "Selected booking was cancelled successfully!"
            }))
            setTimeout(() => {
                window.location.reload()
            }, 1000)
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
        {bookedShifts.length > 0 ? (
            <div className="flex flex-col w-full">
            <p className='text-2xl useinter ps-5 pt-5 text-black font-bold'>Cancel your bookings</p>
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <label htmlFor="selectShift" className="me-5 mt-2">Select a Shift:</label>
                    <select disabled={bookedShifts.length === 0} id="selectShift" name="selectShift" className="w-44 mt-1 border border-slate-400 rounded-lg p-1" value={selectedShift} onChange={e => {setSelectedShift(e.target.value)}} required>
                        {bookedShifts.map((shift, index) =>(
                            <option key={shift._id} value={index + 1}>{index+1}</option>
                        ))}
                    </select>
                </div>
                {bookedShifts.length !== 0 && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                    className={`${!showDetails ? "mt-7" : "mt-7"} mb-4 text-sm inter font-medium text-purple-500 items-center underline flex cursor-pointer select-none`} onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? <span>Hide details</span> : <span>Show details</span>}
                    <motion.div
                        animate={{ rotate: showDetails ? 180 : 0}} transition={{ duration: 0.3 }}
                    >
                        <CaretDown className="m-2 text-purple-500" size={16}/>
                    </motion.div>
                </motion.div>
                )}
                {showDetails && (
                <motion.div
                    initial={{y:-10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.2}}
                    className="text-xl mt-4 mb-4"
                >
                    <div className="flex items-center">
                        <span className="inter selection:bg-purple-500 text-slate-800 font-semibold me-4">Date: </span>
                        <span className="inter selection:bg-purple-500 text-slate-800">{formatDate(bookedShifts[parseInt(selectedShift)-1].date)}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inter selection:bg-purple-500 text-slate-800 font-semibold me-4">Start time: </span>
                        <span className="inter selection:bg-purple-500 text-slate-800">{bookedShifts[parseInt(selectedShift)-1].startTime}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inter selection:bg-purple-500 text-slate-800 font-semibold me-4">End time: </span>
                        <span className="inter selection:bg-purple-500 text-slate-800">{bookedShifts[parseInt(selectedShift)-1].endTime}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inter selection:bg-purple-500 text-slate-800 font-semibold me-4">Role: </span>
                        <span className="inter selection:bg-purple-500 text-slate-800">{bookedShifts[parseInt(selectedShift)-1].role}</span>
                    </div>
                </motion.div>
                )}
                <button type="submit" className="p-2 ps-5 pe-5 rounded-xl bg-purple-500 hover:bg-purple-500/75 text-slate-100">Cancel booking</button>
            </form>
        </div>
        ) : (
            <p className='text-2xl useinter ps-5 pt-5 text-black font-bold'>You haven't booked any shifts</p>
        )}
    </div>
  )
}
