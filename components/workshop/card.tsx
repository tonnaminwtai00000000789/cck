import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface UserworkItemProps {
  title: string;
  imageUrl: string;
  description?: string;
  className?: string;
}

export function Userworkitem({
  title,
  imageUrl,
  description,
  className = "",
}: UserworkItemProps) {
  return (
    <Card
      className={`
        group overflow-hidden
        bg-white rounded-xl
        border border-gray-200
        shadow-sm hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        !py-0 !gap-0
        ${className}
      `}
    >
      <CardContent className="flex flex-col gap-3 p-4 !px-4">
        {/* ชื่อด้านบน */}
        <h3 className="text-xl font-bold text-gray-800 text-center line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>

        {/* รูปตรงกลาง */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* คำอธิบาย + action */}
        {description && (
          <div className="pt-2">
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {description}
            </p>
            <div className="flex gap-1 text-emerald-600 font-medium">
              <span>ดูเพิ่มเติม</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
