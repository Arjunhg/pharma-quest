import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const invokeUrl = "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

    try {

        const body = await req.json();

        const response = await fetch(invokeUrl, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
            },
            body: JSON.stringify(body),
        })

        const data = await response.json();

        return NextResponse.json(data,{status:200});
        
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