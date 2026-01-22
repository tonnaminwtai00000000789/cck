'use client';

import { List, X } from 'lucide-react'; // เพิ่ม X สำหรับปิดเมนู
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import  Image  from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: '/', label: 'หน้าแรก' },
    { path: '/keychain', label: 'ไอเดียพวงกุญแจ' },
    { path: '/lid', label: 'วิธีทำฝาขวดน้ำ' },
    { path: '/workshop', label: 'ผลงานของผู้ใช้' },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // ช่วยให้ active link ดูชัดเจนทั้ง desktop และ mobile
  const isActive = (path: string) =>
    pathname === path ||
    (path !== '/' && pathname.startsWith(path));

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/image/logo.png"
              alt="ถังขยะรักโลก DIY Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
              width={64}
              height={64}
            />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ถังขยะรักโลก : DIY
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`
                  relative font-medium text-gray-700 transition-all duration-300
                  hover:text-emerald-600
                  after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:bg-emerald-500
                  after:transition-all after:duration-300
                  ${isActive(link.path)
                    ? 'text-emerald-600 after:w-full'
                    : 'after:w-0 hover:after:w-full'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu - Slide down with smooth transition */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-5 space-y-4 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMenuOpen(false)} // ปิดเมนูเมื่อกดเลือก
              className={`
                block py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${isActive(link.path)
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'}
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}