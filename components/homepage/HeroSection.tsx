'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { heroImages, heroContent } from '@/data';
import { Lightbulb } from 'lucide-react';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-150 overflow-hidden">
            {heroImages.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Image
                        src={img}
                        alt={`Hero slide ${index + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/50 to-black/30"></div>
                </div>
            ))}
            <div className="relative z-20 h-full flex items-center px-4 pt-32">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg text-white">
                            {heroContent.title}
                        </h1>
                        <p className="text-2xl mb-8 drop-shadow-md text-gray-200">
                            {heroContent.description}
                        </p>
                        <Button
                            onClick={() => router.push('/keychain')}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-xl cursor-pointer flex items-center transition-transform hover:scale-105"
                        >
                            <Lightbulb className="w-6 h-6 mr-3" />
                            {heroContent.buttonText}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
