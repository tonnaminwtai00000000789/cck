import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LandscapeTagItemProps {
  imageUrl: string;
  className?: string;
}

export function LandscapeTagItem({
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


      <CardContent className="!p-0">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt="keychain"
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