"use client"

import axios from "axios"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter()
    const [userDetails, setUserDetails]: any = React.useState(null)

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
        } catch (error: any) {
            console.log("Logout failed");
            toast.error(error.message)

        }
    }

    const changePassword = async () => {
        router.push("/changepassword")
    }

    const profile = async () => {
        try {
            const resp = await axios.get("api/users/profile")
            setUserDetails(resp.data.data)

            console.log("Profile fetch success", resp.data);
        } catch (error: any) {
            console.log("Profile fetching failed", error.message);
            
            toast.error(error.message)
        }
    }

    useEffect(() => {
        profile()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            
            <p>{userDetails?.name} logged in successfully</p>
            
            <hr />
            <div className="flex flex-row">
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={logout}
                >Logout</button>

                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-6"
                onClick={changePassword}
                >Change Password</button>
            </div>

        </div>
    )
}