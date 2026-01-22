import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AddToGalleryPage() {
  return (
    <div className="min-h-screen flex justify-center bg-white px-4 py-12">
      <div className="w-full max-w-sm space-y-6 text-center">

        <h1 className="text-3xl font-bold leading-snug">
          เพิ่มผลงานลงใน
          <br />
          gallery
        </h1>

        <div className="space-y-5 text-left">

          <div className="space-y-1">
            <label className="text-sm font-medium">
              ชื่อผลงานของคุณ <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="ชื่อผลงานของคุณ"
              className="border-2 border-black rounded-radius font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              คำอธิบาย <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="เขียนคำอธิบายของคุณ"
              className="border-2 border-black rounded-radius font-semibold resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              อัพโหลดรูป <span className="text-red-500">*</span>
            </label>
            <Input
              type="file"
              className="border-2 border-black rounded-radius"
            />
          </div>
        </div>

        <Button
          className="mt-6 w-full rounded-full py-6 text-lg font-bold bg-gray-200 text-black hover:bg-gray-300"
        >
          เพิ่มผลงาน
        </Button>

      </div>
    </div>
  )
}
