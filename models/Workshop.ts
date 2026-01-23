import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWorkshop extends Document {
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkshopSchema = new Schema<IWorkshop>(
  {
    name: {
      type: String,
      required: [true, "กรุณากรอกชื่อผลงาน"],
      trim: true,
      maxlength: [100, "ชื่อผลงานต้องไม่เกิน 100 ตัวอักษร"],
    },
    description: {
      type: String,
      required: [true, "กรุณากรอกคำอธิบาย"],
      trim: true,
      maxlength: [1000, "คำอธิบายต้องไม่เกิน 1000 ตัวอักษร"],
    },
    imageUrl: {
      type: String,
      required: [true, "กรุณาอัพโหลดรูปภาพ"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const Workshop: Model<IWorkshop> =
  mongoose.models.Workshop || mongoose.model<IWorkshop>("Workshop", WorkshopSchema);

export default Workshop;
