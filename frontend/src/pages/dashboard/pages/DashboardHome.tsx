import { CalendarCheck, CalendarDots } from "@phosphor-icons/react"
import { useHS_Dispatch } from "../../../redux/hooks"
import { change } from "../../../redux/dashboard/dashboardSlice"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../../constants"

export default function DashboardHome() {
  const dispatch = useHS_Dispatch()
  const navigate = useNavigate()
  const [shiftDetails, setShiftDetails] = useState({availableShifts: [], bookedShifts: []})

  useEffect(() => {
    const getAvailableShifts = async () => {
      await axios.get(`${API_URL}/api/shifts/available`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(response => {

        setShiftDetails(prevState => ({
          ...prevState,
          availableShifts: response.data
        }))
        
      }).catch(err => {
        console.log(err)
      })
    }

    const getBookedShifts = async () => {
      await axios.get(`${API_URL}/api/shifts/booked`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(response => {

        setShiftDetails(prevState => ({
          ...prevState,
          bookedShifts: response.data
        }))

      }).catch(err => {
        console.log(err)
      })
    }

    getAvailableShifts()
    getBookedShifts()

  }, [])

  return (
    <div className='flex w-screen min-h-screen bg-transparent'>
      <div className='flex flex-col w-full'>
        <p className='text-2xl useinter ps-5 pt-5 text-black font-bold'>Dashboard</p>
        <div className="flex w-full pe-10">
          <div className='flex flex-col bg-purple-700 border border-transparent rounded-lg ms-5 mt-3 w-1/5 md:w-1/6 h-20 md:h-36 p-4 justify-center items-center cursor-pointer hover:bg-purple-700/75 select-none' onClick={() => {
            dispatch(change("AvailableShifts"))
            navigate(`/dashboard/availableshifts`)
          }}>
            <span className='text-3xl useinter font-bold text-white'>{shiftDetails.availableShifts.length}</span>
            <span className='text-[10px] md:text-sm useinter font-semibold text-white'>Available Shifts</span>
            <div className='hidden md:flex'>
              <CalendarDots size={72} className='text-white'/>
            </div>
          </div>
          <div className='flex flex-col bg-purple-600 border border-transparent rounded-lg ms-5 mt-3 w-1/5 md:w-1/6 h-20 md:h-36 p-4 justify-center items-center cursor-pointer hover:bg-purple-600/75 select-none' onClick={() => {
            dispatch(change("BookedShifts"))
            navigate(`/dashboard/bookedshifts`)
          }}>
            <span className='text-3xl useinter font-bold text-white'>{shiftDetails.bookedShifts.length}</span>
            <span className='text-[10px] md:text-sm useinter font-semibold text-white'>Booked Shifts</span>
            <div className='hidden md:flex'>
              <CalendarCheck size={72} className='text-white'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
