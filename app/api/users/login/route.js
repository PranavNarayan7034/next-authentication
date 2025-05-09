// Login route.js 

import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server';
import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken'

connectDb()

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { Email, Password } = reqBody;
        console.log(reqBody)

        //   Email Validation
        const user = await User.findOne({ Email }) 
        if (!user) {
            console.log('Invalid Email...')
            return NextResponse.json(
                {error:"Invalid Email"},{status:404}
            )
        }
        // Password Validation
        const validPassword = await bcryptjs.compare(Password, user.Password)
        if (!validPassword) {
            console.log('Invalid Password...')
            return NextResponse.json(
                {error:"Invalid Password"},{status:404}
            )
        }

        // JWT token generation
        // token = tokendata,token secret , expiry time
        // 1) TOKEN DATA 
        const tokenData = {
            id: user._id,
            username: user.Username,
            email : user.Email
        }
        // 2) TOKEN GENERATION 
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1h"})
        
        // 3) SETTING TOKEN INTO USERS COOKIE 
        const response = NextResponse.json(
            {message:"Login Successfull....",success:true},{status:200}
        )
        response.cookies.set("Token",token,{httpOnly:true})
        return response
        

    } catch (error) {
        console.log('Login api error:'+error)
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}