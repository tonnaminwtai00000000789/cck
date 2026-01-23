import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "กรุณาเลือกไฟล์" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "รองรับเฉพาะไฟล์รูปภาพ (JPEG, PNG, GIF, WEBP)" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "ไฟล์ต้องมีขนาดไม่เกิน 10MB" },
        { status: 400 }
      );
    }

    // Create form data for m1r.ai upload
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("uploadType", "0");

    // Upload to m1r.ai
    const uploadResponse = await fetch("https://up.m1r.ai/upload", {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "อัพโหลดไฟล์ไม่สำเร็จ" },
        { status: 500 }
      );
    }

    const result = await uploadResponse.json();

    if (!result.url) {
      return NextResponse.json(
        { error: result.message || "ไม่ได้รับ URL จากเซิร์ฟเวอร์" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.url,
      message: "อัพโหลดสำเร็จ",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัพโหลด" },
      { status: 500 }
    );
  }
}
