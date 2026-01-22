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
        ${className}
      `}
    >
      <CardHeader className="pb-2 text-black bg-white">
        <CardTitle className="text-xl md:text-2xl font-bold tracking-wide text-center">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover"  // ความสูงคงที่เพื่อให้ดู balance เมื่อวางคู่กัน
        />
      </CardContent>
    </Card>
  );
}