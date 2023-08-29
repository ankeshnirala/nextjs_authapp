import axios from "axios"
import {NextResponse, NextRequest} from "next/server"

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        console.log(reqBody);
        

        const postData = {
            "email": reqBody.email,
            "password": reqBody.password
        }

        const resp = await axios.post("http://localhost:8080/api/v1/signin", postData)

        const nextResponse = NextResponse.json(resp.data)
        nextResponse.cookies.set("token", resp.data.data.token, {httpOnly: true})

        return nextResponse
    } catch (error: any) {
        
        return NextResponse.json({error: error.message}, {status: 500})
    }
}