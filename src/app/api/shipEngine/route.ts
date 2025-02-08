import { shipEngine } from "@/helper/shipEngine";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return new Response(JSON.stringify({ message: "Hello, Next.js!" }));
}
export async function POST(request: NextRequest) {
    const {shipToAddress, packages} = await request.json()
    try {
       const shipmented  = await shipEngine.getRatesWithShipmentDetails({
        shipment: {
            shipTo: shipToAddress,
            shipFrom: {
                name: "My Company",
                phone: "123-456-7890",
                addressLine1: "123 Main St",
                addressLine2: "Apt 4",
                cityLocality: "San Francisco",
                stateProvince: "CA",
                postalCode: "94105",
                countryCode: "US",
                addressResidentialIndicator:"no",
            },
            packages: packages,
        },
        rateOptions: {
            carrierIds:[
                process.env.SHIPENGINE_FIRST_COURIER || "",
                process.env.SHIPENGINE_SECOND_COURIER || "",
                process.env.SHIPENGINE_THIRD_COURIER || "",
                process.env.SHIPENGINE_FOURTH_COURIER || "",
            ].filter(Boolean)
       }
       });
        return new Response(JSON.stringify(shipmented), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error" }));
    }
}