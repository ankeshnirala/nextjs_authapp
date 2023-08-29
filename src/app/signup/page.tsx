"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        name: "",
        mobile: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)

            const resp = await axios.post("api/users/signup", user)

            console.log("Signup success", resp.data);
            router.push("/login")
            
        } catch (error: any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0 && /^[7-9]\d{9}$/.test(user.mobile) ) {
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
                            Sign Up
                        </h1>

                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                                <input 
                                    type="text" name="name" id="name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. Ankesh Kumar" 
                                    value={user.name}
                                    onChange={(e) => setUser({...user, name: e.target.value})}
                                />
                            </div>

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
                                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile number</label>
                                <input 
                                    type="tel" name="mobile" id="mobile" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. 8888888888" 
                                    value={user.mobile}
                                    onChange={(e) => setUser({...user, mobile: e.target.value})}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                type="password" name="password" id="password" placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                />
                            </div>
                            
                            <button 
                                disabled={buttonDisabled}
                                className={ (!buttonDisabled ?"hover:bg-blue-700 ": "" )+ "w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
                                onClick={onSignup}
                                >{loading? "Processing...": "Create an account"}</button>
                            
                            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </div>

                    </div>
                </div>
            
            </div>
        </section>        
    )
}