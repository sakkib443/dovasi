"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FiMail, FiPhone, FiClock, FiFacebook, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const TopHeader = () => {
  const { language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  return (
    <div className="w-full py-1.5 sm:py-2.5 bg-[#0f0303] text-white/60 border-b border-white/[0.03] relative z-[60] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">

          {/* Left - Brand Message / Specialized Tag */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span className={`text-[12px] font-normal uppercase tracking-[0.2em] text-primary ${bengaliClass}`}>
                {language === 'bn' ? 'চীন-বাংলাদেশ ইন্ডাস্ট্রিয়াল ব্রিজ' : 'Industrial Bridge: China & Bangladesh'}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="mailto:eshahadat@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors text-[12px] font-normal tracking-tight"
              >
                <FiMail className="text-primary" size={12} />
                <span>eshahadat@gmail.com</span>
              </a>
              <div className="w-px h-3 bg-white/10 hidden sm:block"></div>
              <a
                href="tel:+8801700630200"
                className="flex items-center gap-2 hover:text-white transition-colors text-[12px] font-normal tracking-tight"
              >
                <FiPhone className="text-primary" size={12} />
                <span>+88 01700 630200</span>
              </a>
            </div>
          </div>

          {/* Right - Timing & Socials (Hidden on mobile if empty) */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[12px] font-normal uppercase tracking-wider text-white/30">
              <FiClock className="text-primary/40" size={12} />
              <span>Mon - Sat: 09:00 - 20:00</span>
            </div>

            <div className="w-px h-3 bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-all duration-300 transform hover:scale-110">
                <FiFacebook size={14} />
              </a>
              <a href="#" className="hover:text-primary transition-all duration-300 transform hover:scale-110">
                <FiLinkedin size={14} />
              </a>
              <a href="#" className="hover:text-primary transition-all duration-300 transform hover:scale-110">
                <FiInstagram size={14} />
              </a>
              <a href="#" className="hover:text-[#25D366] transition-all duration-300 transform hover:scale-110">
                <FaWhatsapp size={15} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopHeader;
