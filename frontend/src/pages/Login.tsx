import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { API_URL, INCORRECT_PASSWORD, IncorrectPasswordText, USER_NOT_FOUND, UserNotFoundText } from "../constants";
import { useHS_Dispatch } from "../redux/hooks";
import PopupBox from "../components/modals/PopupBox";
import axios from "axios";
import { login } from "../redux/user/userSlice";

export default function Login() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        return () => {
          document.body.style.overflow = 'unset';
        };
    }, [])

    const LOGIN_API = `${API_URL}/api/auth/login`

    const dispatch = useHS_Dispatch()

    const navigate = useNavigate()

    const [loginDetails, setLoginDetails] = useState({email: "", password: ""})

    const [loginProcess, setLoginProcess] = useState({start: false, success: false, done: false, loginres: ""})

    const renderLoginProgress = () => {
        if(loginProcess.done){
          if(loginProcess.success){
            return <PopupBox type="loading" message="Logged in successfully. Redirecting..."/>
          }
          else{
            switch(loginProcess.loginres){
              case USER_NOT_FOUND:
                return <PopupBox type="error" message="Login failed!" moreinfo={UserNotFoundText} closebt setLoginProcess={setLoginProcess}/>
              case INCORRECT_PASSWORD:
                return <PopupBox type="error" message="Login failed!" moreinfo={IncorrectPasswordText} closebt setLoginProcess={setLoginProcess}/>
              default:
                return <PopupBox type="error" message="Login failed!" moreinfo="Something went wrong or invalid format found" closebt setLoginProcess={setLoginProcess}/>
            }
          }
        }
        else{
          return <PopupBox type="loading"/>
        }
      }

      const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        setLoginProcess({
            ...loginProcess,
            start: true
        })

        await axios.post(LOGIN_API, loginDetails, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(response => {
            setLoginProcess({
                ...loginProcess,
                start: true,
                success: true,
                done: true,
            })
            dispatch(login(response.data))
            navigate("/dashboard")

        }).catch(err => {
            setLoginProcess({
                ...loginProcess,
                start: true,
                success: false,
                done: true,
                loginres: err.response.data.message
            })
            console.log(err)
        })
    }

  return (
    <section className="bg-slate-200">
        {loginProcess.start && (
            renderLoginProgress()
        )}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-slate-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Log in
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" value={loginDetails.email} onChange={e => {setLoginDetails({...loginDetails, email: e.target.value})}} className="bg-gray-50 border border-purple-300 outline-0 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="example@gmail.com" required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" value={loginDetails.password} onChange={e => {setLoginDetails({...loginDetails, password: e.target.value})}} placeholder="••••••••" className="bg-gray-50 border border-purple-300 outline-0 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required/>
                        </div>
                        <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
