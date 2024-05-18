import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [])

  return (
    <div className="flex min-h-screen min-w-screen useroboto">
        <div className="flex flex-col w-full h-[400px] justify-center items-center">
            <span className="text-3xl usegaretlight">Welcome to HataraShift!</span>

        <div className="flex space-x-10 mt-16">
            <button className="usegaretlight p-10 ps-14 pe-14 font-semibold bg-gradient-to-r from-slate-200 to-slate-300 border-slate-300 border-2 hover:from-slate-200/75 hover:to-slate-300/75 rounded-lg text-gray-800 hover:text-gray-800/75 text-xl select-none" onClick={() => navigate("/login")}>Login</button>
            <button className="usegaretlight p-10 ps-14 pe-14 font-semibold bg-gradient-to-r from-slate-200 to-slate-300 border-slate-300 border-2 hover:from-slate-200/75 hover:to-slate-300/75 rounded-lg text-gray-800 hover:text-gray-800/75 text-xl select-none" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
        </div>
    </div>
  )
}
