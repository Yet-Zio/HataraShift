import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import { useHS_Dispatch } from "../redux/hooks";
import { login } from "../redux/user/userSlice";

export default function Signup() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        return () => {
          document.body.style.overflow = 'unset';
        };
    }, [])

    const [signupDetails, setSignupDetails] = useState({name: "", email: "", password: ""})

    const SIGNUP_API = `${API_URL}/api/auth/register`

    const dispatch = useHS_Dispatch()
    
    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        await axios.post(SIGNUP_API, signupDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {

            console.log(response)
            dispatch(login(response.data))
            
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <section className="bg-slate-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-slate-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign up
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                            <input type="text" value={signupDetails.name} onChange={e => setSignupDetails({...signupDetails, name: e.target.value})} name="name" id="name" className="bg-gray-50 border border-purple-300 outline-0 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="John Doe" required/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" value={signupDetails.email} onChange={e => setSignupDetails({...signupDetails, email: e.target.value})} name="email" id="email" className="bg-gray-50 border border-purple-300 outline-0 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="example@gmail.com" required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" value={signupDetails.password} onChange={e => setSignupDetails({...signupDetails, password: e.target.value})} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-purple-300 outline-0 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required/>
                        </div>
                        <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
