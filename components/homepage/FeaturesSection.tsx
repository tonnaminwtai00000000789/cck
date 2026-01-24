import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function FeaturesSection() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6">ไอเดียพวงกุญแจ DIY</h3>
                    <Link href="/keychain">
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow py-0! gap-0!">
                        <CardContent className="p-0!">
                            <div className="relative w-full h-80">
                                <Image
                                    src="/image/keychain-ideas/2.png"
                                    alt="materials"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                </div>


                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6">วิธีการทำฝาขวดน้ำ</h3>
                    <Link href="/howto">
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow py-0! gap-0!">
                        <CardContent className="p-0!">
                            <div className="relative w-full h-80">
                                <Image
                                    src="/image/howto.png"
                                    alt="gallery"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6">ผลงานของผู้ใช้</h3>
                    <Link href="/workshop">
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow py-0! gap-0!">
                        <CardContent className="p-0!">
                            <div className="relative w-full h-80">
                                <Image
                                    src="/image/donthave.png"
                                    alt="gallery"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
