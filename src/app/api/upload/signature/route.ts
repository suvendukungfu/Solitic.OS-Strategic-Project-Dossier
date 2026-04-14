import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from 'cloudinary';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // Generate a signature for a signed upload
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: 'solitic-assets',
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}
