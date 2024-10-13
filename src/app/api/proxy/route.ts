import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: NextRequest){
    const invokeUrl = "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

    try {
        const body = await req.json();

        console.log("Sending request to NVIDIA API:", {
            url: invokeUrl,
            bodyLength: JSON.stringify(body).length,
            hasApiKey: !!process.env.NVIDIA_API_KEY
        });

        const response = await axios.post(invokeUrl, body, {
            headers:{
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
            },
        });

        console.log("Received response from NVIDIA API:", {
            status: response.status,
            dataLength: JSON.stringify(response.data).length
        });

        return NextResponse.json(response.data, {status:200});
        
    } catch (error:any) {
        console.error("Detailed error in proxy:", {
            message: error.message,
            stack: error.stack,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : null
        });

        return NextResponse.json(
            {
                error: "Something went wrong",
                details: error.message
            },
            {
                status: 500
            }
        );
    }
}