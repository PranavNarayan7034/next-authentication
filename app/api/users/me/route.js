import { getDatafromToken } from "@/helpers/getDatafromToken";
import { NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDb();

export async function GET(request) {
    try {
        
        const userId = await getDatafromToken(request)
        const user = await User.findOne({ _id: userId })
            .select("-Password -isAdmin -isVerified")
        return NextResponse.json(
            {message:"User Found",Data:user}
        )
    } catch (error) {
        return NextResponse.json(
            {error:error.message},{status:400}
        )
    }
}