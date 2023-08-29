import axios from "axios"
import {NextResponse, NextRequest} from "next/server"


export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value

        const resp = await axios.get("http://localhost:8080/api/v1/users/profile", {headers: {Authorization: token}})

        return NextResponse.json(resp.data)
    } catch (error: any) {        
        return NextResponse.json({error: error.message}, {status: 500})
    }
}