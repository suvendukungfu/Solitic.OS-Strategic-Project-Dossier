import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  
  if (!session || !['ADMIN', 'EDITOR'].includes(user?.role || '')) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: "No file received" }, { status: 400 });
    }

    // Advanced Institutional Constraint: 5MB Threshold
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "Asset too large. Max 5MB authorized." }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ message: "Must be a valid institutional visual format (Image)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a safe, unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    
    // Assumes writing to the active running directory which resolves to the project root
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    await writeFile(path.join(uploadDir, filename), buffer);

    // Return the URL directly to the uploaded image
    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 200 });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
