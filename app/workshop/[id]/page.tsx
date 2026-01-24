import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { CopyLinkButton } from "@/components/workshop/CopyLinkButton";
import { getWorkshopById } from "@/lib/workshop";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const workshop = await getWorkshopById(id);

  if (!workshop) {
    return {
      title: "ไม่พบผลงาน | ถังขยะรักโลก : DIY"
    };
  }

  return {
    title: `${workshop.name} | ถังขยะรักโลก : DIY`,
    description: workshop.description,
    openGraph: {
      title: `${workshop.name} | ถังขยะรักโลก : DIY`,
      description: workshop.description,
      images: [
        {
          url: workshop.imageUrl,
          width: 1200,
          height: 630,
          alt: workshop.name,
        }
      ],
      type: 'article',
      locale: 'th_TH',
      siteName: 'ถังขยะรักโลก : DIY',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${workshop.name} | ถังขยะรักโลก : DIY`,
      description: workshop.description,
      images: [workshop.imageUrl],
    },
  };
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workshop = await getWorkshopById(id);

  if (!workshop) {
    notFound();
  }

  const createdDate = new Date(workshop.createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/workshop"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับไปหน้าผลงาน
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Image */}
          <div className="relative p-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3]">
              <Image
                src={workshop.imageUrl}
                alt={workshop.name}
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{createdDate}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {workshop.name}
            </h1>

            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {workshop.description}
            </p>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
              <CopyLinkButton workshopId={workshop._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
