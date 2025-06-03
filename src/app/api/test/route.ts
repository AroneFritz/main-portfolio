import { NextResponse } from "next/server";

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ 
    message: "API is working!", 
    timestamp: new Date().toISOString() 
  });
}
