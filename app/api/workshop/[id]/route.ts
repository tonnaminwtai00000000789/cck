import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Workshop from "@/models/Workshop";
import mongoose from "mongoose";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET - Fetch single workshop item
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ไม่พบผลงานที่ต้องการ" },
        { status: 404 }
      );
    }

    const workshop = await Workshop.findById(id).lean();

    if (!workshop) {
      return NextResponse.json(
        { error: "ไม่พบผลงานที่ต้องการ" },
        { status: 404 }
      );
    }

    return NextResponse.json(workshop);
  } catch (error) {
    console.error("Error fetching workshop:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

// PATCH - Update workshop item
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ไม่พบผลงานที่ต้องการ" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, description, imageUrl } = body;

    const update: Record<string, string> = {};
    if (name != null) update.name = String(name).trim();
    if (description != null) update.description = String(description).trim();
    if (imageUrl != null) update.imageUrl = String(imageUrl).trim();

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: "ไม่มีข้อมูลที่ต้องการแก้ไข" },
        { status: 400 }
      );
    }

    const workshop = await Workshop.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();

    if (!workshop) {
      return NextResponse.json(
        { error: "ไม่พบผลงานที่ต้องการ" },
        { status: 404 }
      );
    }

    return NextResponse.json(workshop);
  } catch (error) {
    console.error("Error updating workshop:", error);
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการแก้ไขข้อมูล" },
      { status: 500 }
    );
  }
}

// DELETE - Delete workshop item
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ไม่พบผลงานที่ต้องการ" },
        { status: 404 }
      );
    }

    const workshop = await Workshop.findByIdAndDelete(id);

    if (!workshop) {
      return NextResponse.json(
        { error: "ไม่พบผลงานที่ต้องการ" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "ลบผลงานสำเร็จ" });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลบข้อมูล" },
      { status: 500 }
    );
  }
}
