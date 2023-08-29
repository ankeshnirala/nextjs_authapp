import axios from "axios"
import {NextResponse, NextRequest} from "next/server"

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const postData = {
            "username": reqBody.name,
            "email": reqBody.email,
            "name": reqBody.name,
            "mobile": reqBody.mobile,
            "password": reqBody.password
        }

        console.log(postData, "POST DATA");
        

        const resp = await axios.post("http://localhost:8080/api/v1/signup", postData)

        return NextResponse.json(resp.data)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}