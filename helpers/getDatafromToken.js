import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function getDatafromToken(request) {
    try {
        
        //encode token
        const token = request.cookies.get('Token')?.value || ""
        //decode token 
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        return decodedToken.id;

    } catch (error) {
        return NextResponse.json(
            {error:error.message}
        )
    }
}