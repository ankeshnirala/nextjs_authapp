import {NextResponse, NextRequest} from "next/server"

export async function GET() {
    try {
        const nextResponse = NextResponse.json({message: "Logout successful"})
        nextResponse.cookies.set("token", "", {httpOnly: true})

        return nextResponse
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}