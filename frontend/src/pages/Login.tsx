import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        return () => {
          document.body.style.overflow = 'unset';
        };
    }, [])

  return (
    <section className="bg-slate-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-slate-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Log in
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-purple-300 outline-0 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="example@gmail.com" required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-purple-300 outline-0 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required/>
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
