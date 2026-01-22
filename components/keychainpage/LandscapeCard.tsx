import { Card, CardContent } from "@/components/ui/card";

interface LandscapeCardProps {
  title: string;
  imageUrl: string;
  features: string[];
}

export function LandscapeCard({ title, imageUrl, features }: LandscapeCardProps) {
  return (
    <Card
      className="
        overflow-hidden
        rounded-2xl
        border border-gray-200
        bg-white
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        w-full max-w-2xl
      "
    >
      {/* รูปภาพ */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-8 space-y-5">
        <h3 className="text-3xl font-bold text-gray-900">
          {title}
        </h3>

        <div>
          <p className="font-semibold text-gray-700 mb-3">
            ข้อมูล
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {features.map((item, index) => (
              <li key={index} className="text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
