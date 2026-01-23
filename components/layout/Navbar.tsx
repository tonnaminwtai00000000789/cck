'use client';

import { List, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: '/', label: 'หน้าแรก' },
    { path: '/keychain', label: 'ไอเดียพวงกุญแจ' },
    { path: '/lid', label: 'วิธีทำฝาขวดน้ำ' },
    { path: '/workshop', label: 'ผลงานของผู้ใช้' },
  ];

  const isActive = (path: string) =>
    pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/image/logo.png"
              alt="ถังขยะรักโลก DIY Logo"
              width={56}
              height={56}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ถังขยะรักโลก : DIY
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600 "
              >
                {link.label}
                <span
                  className={`
                    absolute left-1/2 -bottom-1 h-[2px] bg-emerald-500
                    transition-all duration-300
                    ${isActive(link.path)
                      ? 'w-6 -translate-x-1/2'
                      : 'w-0 -translate-x-1/2 group-hover:w-6 '}
                  `}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden transition-all duration-300 ease-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden
        `}
      >
        <div className="px-4 pb-6 space-y-2 bg-white/95 backdrop-blur-sm border-t border-emerald-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`
                block rounded-xl px-4 py-3 text-sm font-medium transition-all
                ${isActive(link.path)
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-700 hover:bg-emerald-50/60 hover:text-emerald-600 hover:text-black'}
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
