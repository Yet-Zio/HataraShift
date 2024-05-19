import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { API_URL } from "../constants";

export default function Home() {

  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [])


  const testCookie = async () => {
    await axios.get(`${API_URL}/api/shifts/available`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    }).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="flex min-h-screen min-w-screen useroboto">
        <div className="flex flex-col w-full h-[400px] justify-center items-center">
            <span className="text-3xl">Welcome to HataraShift!</span>

        <div className="flex space-x-10 mt-16">
            <button className="p-10 ps-14 pe-14 font-semibold bg-slate-100 border-slate-300 border-2 hover:bg-slate-100/75 rounded-lg text-gray-800 hover:text-gray-800/75 text-xl select-none" onClick={() => navigate("/login")}>Log in</button>
            <button className="p-10 ps-14 pe-14 font-semibold bg-slate-100 border-slate-300 border-2 hover:bg-slate-100/75 rounded-lg text-gray-800 hover:text-gray-800/75 text-xl select-none" onClick={() => navigate("/signup")}>Sign up</button>
            <button className="p-10 ps-14 pe-14 font-semibold bg-slate-100 border-slate-300 border-2 hover:bg-slate-100/75 rounded-lg text-gray-800 hover:text-gray-800/75 text-xl select-none" onClick={() => {testCookie()}}>Test cookie</button>
        </div>
        </div>
    </div>
  )
}
