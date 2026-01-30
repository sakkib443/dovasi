"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaPhoneAlt, FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const FloatingCTA = () => {
    const pathname = usePathname();
    const { language } = useLanguage();

    // Hide on contact page
    if (pathname === "/contact") return null;

    return (
        <div className="fixed bottom-10 right-6 z-50 flex flex-col gap-4">
            {/* Ask a Question / Chat Fab */}
            <AnimatePresence>
                <motion.a
                    key="whatsapp-cta"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    href="https://wa.me/8801700630200"
                    target="_blank"
                    className="flex items-center gap-3 bg-white text-maroon p-1.5 sm:p-2 sm:pr-5 rounded-full shadow-2xl border border-primary/20 group transition-all"
                >
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white shrink-0">
                        <FaWhatsapp size={20} />
                    </div>
                    <span className="text-sm font-bold truncate hidden sm:inline">
                        {language === 'zh' ? '在此咨询' : 'Ask a Question'}
                    </span>
                </motion.a>

                <motion.a
                    key="phone-cta"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    href="tel:+8801700630200"
                    className="flex items-center gap-3 bg-primary text-maroon p-1.5 sm:p-2 sm:pr-5 rounded-full shadow-2xl border border-white/20 group transition-all"
                >
                    <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center text-primary shrink-0">
                        <FaPhoneAlt size={16} />
                    </div>
                    <span className="text-sm font-bold hidden sm:inline">
                        {language === 'zh' ? '预约口译员' : 'Book an Interpreter'}
                    </span>
                </motion.a>
            </AnimatePresence>
        </div>
    );
};

export default FloatingCTA;
