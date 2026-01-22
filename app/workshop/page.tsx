import { Userworkitem } from "@/components/workshop/card"
import userwork from "@/data/userwork"
import Link from "next/link"

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Workshop Page
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userwork.map((item, index) => (
            <Link
              key={index}
              href={`/workshop/${item.name}`}
              className="block"
            >
              <Userworkitem
                title={item.name}
                imageUrl={item.imageUrl}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
