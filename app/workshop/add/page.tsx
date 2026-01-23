"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, ImageIcon, Loader2 } from "lucide-react";

export default function AddToGalleryPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }
    setFile(selectedFile);
    setError(null);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("กรุณากรอกชื่อผลงาน");
      return;
    }
    if (!description.trim()) {
      setError("กรุณากรอกคำอธิบาย");
      return;
    }
    if (!file) {
      setError("กรุณาเลือกรูปภาพ");
      return;
    }

    setIsLoading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error || "อัพโหลดรูปภาพไม่สำเร็จ");
      }

      const workshopResponse = await fetch("/api/workshop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          imageUrl: uploadResult.url,
        }),
      });

      const workshopResult = await workshopResponse.json();

      if (!workshopResponse.ok) {
        throw new Error(workshopResult.error || "บันทึกผลงานไม่สำเร็จ");
      }

      router.push("/workshop");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/workshop"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับไปหน้าผลงาน
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">เพิ่มผลงานใหม่</h1>
        <p className="mt-1 text-gray-500">แชร์ผลงานสร้างสรรค์ของคุณ</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                รูปภาพผลงาน <span className="text-red-500">*</span>
              </label>
              
              {!preview ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative cursor-pointer
                    border-2 border-dashed rounded-xl
                    p-8 text-center
                    transition-all duration-200
                    ${isDragging 
                      ? "border-emerald-500 bg-emerald-50" 
                      : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isDragging ? "bg-emerald-100" : "bg-gray-100"}`}>
                      {isDragging ? (
                        <Upload className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      ลากไฟล์มาวางที่นี่ หรือ <span className="text-emerald-600 font-medium">คลิกเพื่อเลือก</span>
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF, WEBP (สูงสุด 10MB)</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg text-sm font-medium hover:bg-white transition-colors shadow-sm"
                  >
                    เปลี่ยนรูป
                  </button>
                </div>
              )}
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                ชื่อผลงาน <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="เช่น พวงกุญแจจากฝาขวด"
                className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                คำอธิบาย <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="เล่าเรื่องราวหรือวิธีทำของผลงานชิ้นนี้..."
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  กำลังอัพโหลด...
                </span>
              ) : (
                "เพิ่มผลงาน"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
