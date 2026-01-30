"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BiMenu, BiX } from "react-icons/bi";
import { FiGlobe, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { href: "/", label: t("navbar.home") },
    { href: "/about", label: t("navbar.about") },
    { href: "/services", label: t("navbar.services") },
    { href: "/clients", label: t("navbar.clients") },
    { href: "/testimonials", label: t("navbar.testimonials") },
    { href: "/blogs", label: t("navbar.blog") },
    { href: "/contact", label: t("navbar.contact") },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${isSticky
          ? "bg-[#1a0505]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-maroon border-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img
                  className={`transition-all duration-300 ${isSticky ? "w-12 sm:w-16" : "w-16 sm:w-24"}`}
                  src="/images/ejobsitlogo.png"
                  alt="Dovasi Logo"
                />
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {menu.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`text-[14px] font-bold uppercase tracking-[0.1em] transition-all flex items-center gap-1.5 py-2 ${pathname === item.href ? "text-primary" : "text-white/70 hover:text-white"}`}
                  >
                    {item.label}
                  </Link>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-left ${pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </div>
              ))}
            </div>

            {/* Right: Action Button & Language Switcher */}
            <div className="flex items-center gap-4">
              {/* Language Switcher Dropdown */}
              <div className="relative group/lang">
                <button className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/10 text-white hover:text-white hover:border-primary/50 transition-all bg-white/5 shadow-inner group">
                  <FiGlobe className="text-primary group-hover:rotate-180 transition-transform duration-700" size={18} />
                  <span className="text-[13px] font-bold tracking-wide min-w-[60px] text-left">
                    {language === 'en' ? 'English' : language === 'bn' ? 'বাংলা' : '中文'}
                  </span>
                  <FiChevronDown className="text-white/20 group-hover:text-primary transition-colors" size={14} />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 py-2 w-40 bg-[#1a0505] border border-white/10 rounded-xl opacity-0 invisible translate-y-2 group-hover/lang:opacity-100 group-hover/lang:visible group-hover/lang:translate-y-0 transition-all duration-300 shadow-2xl backdrop-blur-xl z-[60]">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'bn', label: 'বাংলা (Bengali)' },
                    { code: 'zh', label: '中文 (Chinese)' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full px-4 py-2.5 text-left text-[13px] font-bold transition-colors flex items-center justify-between ${language === lang.code ? 'text-primary bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      {lang.label}
                      {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="#contact"
                className={`hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-maroon hover:bg-white text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 ${isSticky ? "scale-95" : "scale-100"}`}
              >
                {t("navbar.getInTouch", "Get in Touch")}
              </Link>

              <button
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <BiMenu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-[#1a0505] z-[100] flex flex-col p-8 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <img src="/images/ejobsitlogo.png" className="w-28" alt="Logo" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <BiX size={32} />
              </button>
            </div>

            {/* Language Switcher for Mobile */}
            <div className="flex gap-3 mb-10">
              {[
                { code: 'en', label: 'EN' },
                { code: 'bn', label: 'BN' },
                { code: 'zh', label: 'ZH' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex-1 py-3 rounded-xl border text-[10px] font-black transition-all ${language === lang.code ? 'bg-primary text-maroon border-primary shadow-lg shadow-primary/20' : 'border-white/10 text-white/40'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {menu.map((item, idx) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-normal text-white/70 hover:text-primary transition-colors flex items-center justify-between group uppercase tracking-widest"
                  >
                    <span>{item.label}</span>
                  </Link>
                </div>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-8 py-5 bg-primary text-maroon text-center font-black uppercase tracking-widest rounded-2xl text-lg shadow-2xl"
              >
                {t("navbar.bookNow", "Book Now")}
              </Link>
            </div>

            {/* Mobile Footer Deco */}
            <div className="mt-auto py-10 text-center opacity-20">
              <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-white">Dovasi Co-Operation</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
