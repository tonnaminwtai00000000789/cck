import Image from 'next/image';
export default function ProjectIntro() {
    return (
        <div className="bg-linear-to-b from-green-50 to-white py-16">
            <div className="max-w-5xl mx-auto px-4 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-6">
            <Image
              src="/image/logo.png"
              alt="ถังขยะรักโลก DIY Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
              width={64}
              height={64}
            />
                </div>

                <h1
                    className="text-6xl font-black text-black mb-6"
                >
                    ถังขยะรักโลก
                </h1>

                {/* Description */}
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    รายการ
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white px-6 py-3 rounded-full shadow-md font-semibold">
                        ไอเดียพวงกุญแจ DIY
                    </div>
                    <div className="bg-white px-6 py-3 rounded-full shadow-md font-semibold">
                        วิธีการทำฝาขวดน้ำ
                    </div>
                    <div className="bg-white px-6 py-3 rounded-full shadow-md font-semibold">
                        item3
                    </div>
                </div>
            </div>
        </div>
    );
}
