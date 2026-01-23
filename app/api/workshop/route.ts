import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Workshop from "@/models/Workshop";

// GET - Fetch all workshop items
export async function GET() {
  try {
    await dbConnect();

    const workshops = await Workshop.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(workshops);
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

// POST - Create new workshop item
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, description, imageUrl } = body;

    // Validate required fields
    if (!name || !description || !imageUrl) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const workshop = await Workshop.create({
      name,
      description,
      imageUrl,
    });

    return NextResponse.json(workshop, { status: 201 });
  } catch (error) {
    console.error("Error creating workshop:", error);
    
    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" },
      { status: 500 }
    );
  }
}
