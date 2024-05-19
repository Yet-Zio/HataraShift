import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../../constants"

export default function AvailableShifts() {

    const [availableShifts, setAvailableShifts] = useState<Shift[]>([])

    useEffect(() => {
        const getAvailableShifts = async () => {
            await axios.get(`${API_URL}/api/shifts/available`, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            }).then(response => {
                
                setAvailableShifts(response.data)

            }).catch(err => {
              console.log(err)
            })
          }
        
        getAvailableShifts()
    }, [])

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr)

        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth() + 1).padStart(2, '0')
        const day = String(date.getUTCDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }
  return (
    <div className="flex flex-col w-screen min-h-screen bg-transparent useroboto pe-7">
        <p className='text-2xl useinter ps-5 pt-5 text-black font-bold'>Available Shifts</p>
        <table className="min-w-full mt-5 border-collapse border bg-lime-100/50 border-gray-300">
            <thead>
            <tr>
                <th className="font-semibold border border-gray-300 px-4 py-2">No</th>
                <th className="font-semibold border border-gray-300 px-4 py-2">Date</th>
                <th className="font-semibold border border-gray-300 px-4 py-2">Start Time</th>
                <th className="font-semibold border border-gray-300 px-4 py-2">End Time</th>
                <th className="font-semibold border border-gray-300 px-4 py-2">Role</th>
            </tr>
            </thead>
            <tbody>
            {availableShifts.map((shift, index) => (
                <tr key={shift._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{formatDate(shift.date)}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{shift.startTime}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{shift.endTime}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{shift.role}</td>
            </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}
