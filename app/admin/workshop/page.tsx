"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Pencil, Trash2, Loader2 } from "lucide-react";

interface Workshop {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminWorkshopPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchWorkshops = async () => {
    try {
      const res = await fetch("/api/workshop");
      if (res.ok) {
        const data = await res.json();
        setWorkshops(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/workshop/${id}`, { method: "DELETE" });
      if (res.ok) {
        setWorkshops((prev) => prev.filter((w) => w._id !== id));
        setConfirmId(null);
      } else {
        const json = await res.json().catch(() => ({}));
        alert(json.error || "ลบไม่สำเร็จ");
      }
    } catch (e) {
      alert("เกิดข้อผิดพลาด");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับหน้าหลัก
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          จัดการ Workshop
        </h1>
        <p className="mt-1 text-gray-500">ลบหรือแก้ไขผลงาน</p>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            ยังไม่มีผลงาน
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((w) => (
              <div
                key={w._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={w.imageUrl}
                    alt={w.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {w.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {w.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/admin/workshop/${w._id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                      >
                        <Pencil className="w-4 h-4" />
                        แก้ไข
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setConfirmId(w._id)}
                      disabled={deletingId === w._id}
                    >
                      {deletingId === w._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      ลบ
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog
        open={!!confirmId}
        onOpenChange={(open) => !open && setConfirmId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>
              ผลงานนี้จะถูกลบถาวร คุณต้องการลบต่อหรือไม่?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => confirmId && handleDelete(confirmId)}
            >
              ลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
