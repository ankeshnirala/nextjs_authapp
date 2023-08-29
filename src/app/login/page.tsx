"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)

            const resp = await axios.post("api/users/login", user)

            console.log("Signin success", resp.data);
            toast.success("Signin success")
            router.push("/profile")
            
        } catch (error: any) {
            console.log("Signin failed", error.message);
            
            toast.error(error.message)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <section className="bg-gray-50 min-h-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        LogIn
                    </h1>

                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input 
                                type="email" name="email" id="email" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. name@company.com" 
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input 
                            type="text" name="password" id="password" placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                        </div>
                        
                        <button 
                            disabled={buttonDisabled}
                            className={ (!buttonDisabled ?"hover:bg-blue-700 ": "" )+ "w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
                            onClick={onLogin}
                            >{loading? "Processing...": "LogIn"}</button>
                        
                        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                            Don't have account? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                        </p>
                    </div>
                </div>
            </div>   
        </div>
    </section>  
    )
}