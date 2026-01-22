import { Card, CardContent } from '@/components/ui/card';

export default function FeaturesSection() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6">ไอเดียพวงกุญแจ DIY</h3>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                            <img
                                src="https://placehold.co/500x400?text=item1"
                                alt="materials"
                                className="w-full h-80 object-cover"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6">วิธีการทำฝาขวดน้ำ</h3>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                            <img
                                src="https://placehold.co/500x400?text=item2"
                                alt="gallery"
                                className="w-full h-80 object-cover"
                            />
                        </CardContent>
                    </Card>
                </div>

                                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6">item3</h3>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                            <img
                                src="https://placehold.co/500x400?text=item3"
                                alt="gallery"
                                className="w-full h-80 object-cover"
                            />
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
