import { LandscapeCard } from "@/components/lidpage/LandscapeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "วิธีการทำพวงกุญแจจากฝาขวดน้ำ | ถังขยะรักโลก : DIY",
};


export default function KeychainPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          วิธีการทำฝาขวดน้ำ
        </h1>

        {/* กลางจอ + เด่น */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <LandscapeCard
              title="วิธีการทำพวงกุญแจจากฝาขวดน้ำ"
              imageUrl="/image/keychain-ideas/kuy.png"
              features={["ใช้ฝาขวดน้ำเปล่า", "ตกแต่งด้วยสีและสติ๊กเกอร์", "เพิ่มห่วงพวงกุญแจ"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
