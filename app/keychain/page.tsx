import { LandscapeCard } from "@/components/keychainpage/LandscapeCard";

const card = {
  title: "title example",
  imageUrl: "https://placehold.co/800x450/",
  features: ["ex1", "ex2", "ex3", "ex4"],
};

export default function KeychainPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Landscape Cards
        </h1>

        {/* กลางจอ + เด่น */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <LandscapeCard
              title={card.title}
              imageUrl={card.imageUrl}
              features={card.features}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
