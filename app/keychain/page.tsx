import { LandscapeTagItem } from "@/components/keychainpage/LandscapeTagItem";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ไอเดียพวงกุญแจเบื้องต้น | ถังขยะรักโลก : DIY",
};

const items = [
  {
    imageUrl:
      "/image/keychain-ideas/2.png",
  },
  {
    imageUrl:
      "/image/keychain-ideas/3.png",
  },
  {
    imageUrl:
      "/image/keychain-ideas/4.png",
  },
  {
    imageUrl:
      "/image/keychain-ideas/5.png",
  },
  {
    imageUrl:
      "/image/keychain-ideas/6.png",
  },
  {
    imageUrl:
      "/image/keychain-ideas/7.png",
  },
  {
    imageUrl:
      "/image/keychain-ideas/8.png",
    },
  {
    imageUrl:
      "/image/keychain-ideas/9.png",
  },
  {
    imageUrl:
      "/image/keychain-ideas/10.png",
  },
];

export default function HowtoPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          ไอเดียพวงกุญแจเบื้องต้น
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 place-items-center">
          {items.map((item, index) => (
            <LandscapeTagItem
              key={index}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
