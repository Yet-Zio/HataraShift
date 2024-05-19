import axios from "axios"
import { useHS_Selector, useHS_Dispatch} from "../redux/hooks"
import { API_URL } from "../constants"
import { logout } from "../redux/user/userSlice"

export default function Navbar() {

  const dispatch = useHS_Dispatch()
  const userData = useHS_Selector(state => state.user)

  const handleLogOut = async () => {
    await axios.post(`${API_URL}/api/auth/logout`, {}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(() => {

      dispatch(logout())
      window.location.href = "/"
      
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <nav className="flex w-full items-center ps-3">
      <div className="flex items-center">
        <img src="/favicon.png" className='hover:cursor-pointer w-[32px] h-[32px]' onClick={() => {window.location.href = "/"}}/>
        <span className='text-2xl text-slate-900 ms-2 hover:cursor-pointer select-none font-bold' onClick={() => {window.location.href = "/"}}>HataraShift</span>
      </div>
      {userData.currentUser != null && ( <div className="flex w-full justify-end relative">
        <button className="me-4 p-2 ps-4 pe-4 bg-purple-600 hover:bg-purple-600/75 rounded-3xl text-slate-100" onClick={handleLogOut}>Log out</button>
      </div>)}
    </nav>
  )
}