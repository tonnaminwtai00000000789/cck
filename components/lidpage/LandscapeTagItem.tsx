import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LandscapeTagItemProps {
  title: string;
  imageUrl: string;
  className?: string;
}

export function LandscapeTagItem({
  title,
  imageUrl,
  className = "",
}: LandscapeTagItemProps) {
  return (
    <Card
      className={`
        overflow-hidden hover:shadow-2xl transition-all duration-300
        border border-gray-200 shadow-md
        rounded-xl
        w-full 
        max-w-md 
        !py-0 !gap-0
        ${className}
      `}
    >
      <CardHeader className="!py-4 text-black bg-white">
        <CardTitle className="text-xl md:text-2xl font-bold tracking-wide text-center">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="!p-0">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
}