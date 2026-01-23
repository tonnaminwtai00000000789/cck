"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ImageIcon, Loader2 } from "lucide-react";

export default function AdminWorkshopEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/workshop/${id}`);
        if (!res.ok) throw new Error("โหลดไม่สำเร็จ");
        const data = await res.json();
        setName(data.name ?? "");
        setDescription(data.description ?? "");
        setImageUrl(data.imageUrl ?? "");
        setPreview(data.imageUrl ?? null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const processFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }
    setFile(f);
    setError(null);
    setPreview(URL.createObjectURL(f));
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

    setSaving(true);
    try {
      let finalImageUrl = imageUrl;
      if (file) {
        const form = new FormData();
        form.append("file", file);
        const up = await fetch("/api/upload", { method: "POST", body: form });
        const upJson = await up.json();
        if (!up.ok) throw new Error(upJson.error || "อัพโหลดรูปไม่สำเร็จ");
        finalImageUrl = upJson.url;
      }

      const res = await fetch(`/api/workshop/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          imageUrl: finalImageUrl,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "แก้ไขไม่สำเร็จ");

      router.push("/admin/workshop");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error && !name && !description) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">{error}</p>
        <Link href="/admin/workshop">
          <Button variant="outline">กลับไปจัดการ Workshop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/admin/workshop"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับจัดการ Workshop
        </Link>

        <h1 className="text-2xl font-bold text-gray-800">แก้ไขผลงาน</h1>
        <p className="mt-1 text-gray-500">เปลี่ยนชื่อ คำอธิบาย หรือรูปภาพ</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* รูป */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              รูปภาพ
            </label>
            {!preview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-gray-50 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                  disabled={saving}
                />
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">คลิกเพื่อเลือกรูปใหม่</p>
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
                  onClick={() => {
                    setFile(null);
                    setPreview(imageUrl || null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 rounded-lg text-sm font-medium shadow-sm hover:bg-white"
                >
                  เปลี่ยนรูป
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              ชื่อผลงาน <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ชื่อผลงาน"
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              disabled={saving}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              คำอธิบาย <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="คำอธิบาย"
              rows={4}
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
              disabled={saving}
            />
          </div>

          <Button
            type="submit"
            disabled={saving}
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                กำลังบันทึก...
              </span>
            ) : (
              "บันทึกการแก้ไข"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
