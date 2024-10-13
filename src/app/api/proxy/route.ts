import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: NextRequest){

    const invokeUrl = "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

    try {

        const body = await req.json();

        const response = await axios.post(invokeUrl, body, {
            headers:{
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
            },
        })

        return NextResponse.json(response.data,{status:200});
        
    } catch (error) {
        
        console.log("Error in proxy:", error);

        return NextResponse.json(
            {
                error: "Something went wrong"
            },
            {
                status: 500
            }
        )
    }
}