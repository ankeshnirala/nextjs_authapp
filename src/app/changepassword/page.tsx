"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        oldPassword: "",
        newPassword: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onPasswordChange = async () => {
        try {
            setLoading(true)

            const resp = await axios.post("api/users/changepassword", user)

            console.log("Change password success", resp.data);
            toast.success("Change password success")
            router.push("/login")
            
        } catch (error: any) {
            console.log("Change password failed", error.message);
            
            toast.error(error.message)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.oldPassword.length > 0 && user.newPassword.length > 0) {
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

                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                            <input 
                                type="text" name="oldPassword" id="oldPassword" placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={user.oldPassword}
                                onChange={(e) => setUser({...user, oldPassword: e.target.value})}
                            />
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input 
                            type="text" name="newPassword" id="newPassword" placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            value={user.newPassword}
                            onChange={(e) => setUser({...user, newPassword: e.target.value})}
                            />
                        </div>
                        
                        <button 
                            disabled={buttonDisabled}
                            className={ (!buttonDisabled ?"hover:bg-blue-700 ": "" )+ "w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
                            onClick={onPasswordChange}
                            >{loading? "Processing...": "Change Password"}</button>
                    </div>
                </div>
            </div>   
        </div>
    </section>  
    )
}