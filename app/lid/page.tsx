import { LandscapeTagItem } from "@/components/lidpage/LandscapeTagItem";

const items = [
  {
    title: "title1",
    imageUrl:
      "https://placehold.co/400x300/",
  },
  {
    title: "title2",
    imageUrl:
      "https://placehold.co/400x400/",
  },
  {
    title: "title3",
    imageUrl:
      "https://placehold.co/500x400/",
  },
  {
    title: "title4",
    imageUrl:
      "https://placehold.co/500x500/",
  },
  {
    title: "title5",
    imageUrl:
      "https://placehold.co/600x400/",
  },
];

export default function LidPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Main title
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 place-items-center">
          {items.map((item, index) => (
            <LandscapeTagItem
              key={index}
              title={item.title}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
