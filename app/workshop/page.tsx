import { Userworkitem } from "@/components/workshop/card";
import Link from "next/link";
import { getWorkshops, type WorkshopItem } from "@/lib/workshop";

export default async function WorkshopPage() {
  let workshops: WorkshopItem[] = [];
  try {
    workshops = await getWorkshops();
  } catch (error) {
    console.error("Error fetching workshops:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              ผลงานของผู้ใช้
            </h1>
            <p className="mt-2 text-gray-500 text-lg">
              รวมผลงานสร้างสรรค์จากทุกคน
            </p>
          </div>
          
          <Link
            href="/workshop/add"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            เพิ่มผลงาน
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {workshops.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">ยังไม่มีผลงาน</h3>
            <p className="text-gray-500 mb-6">เป็นคนแรกที่แชร์ผลงานของคุณ!</p>
            <Link
              href="/workshop/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              เพิ่มผลงานแรก
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                ทั้งหมด <span className="font-semibold text-emerald-600">{workshops.length}</span> ผลงาน
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((item) => (
                <Link
                  key={item._id}
                  href={`/workshop/${item._id}`}
                  className="block"
                >
                  <Userworkitem 
                    title={item.name} 
                    imageUrl={item.imageUrl}
                    description={item.description}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
