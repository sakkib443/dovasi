"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp, FaFacebookMessenger, FaWeixin, FaCalendarCheck } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const HangingLantern = ({ className, delay = 0, size = "w-24" }) => (
    <motion.div
        initial={{ rotate: -5 }}
        animate={{ rotate: 5 }}
        transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: delay
        }}
        className={`absolute origin-top ${className}`}
    >
        {/* String */}
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-primary/60 mx-auto" />

        {/* Lantern Body */}
        <div className={`${size} h-20 relative`}>
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />

            {/* Main Body */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-maroon border border-primary/30 rounded-[2rem] shadow-2xl overflow-hidden">
                {/* Vertical Ribs */}
                <div className="absolute inset-0 flex justify-around opacity-20">
                    <div className="w-px h-full bg-white" />
                    <div className="w-px h-full bg-white" />
                    <div className="w-px h-full bg-white" />
                </div>
                {/* Gold Caps */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600" />
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600" />
            </div>

            {/* Tassel */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 shadow-lg border border-maroon" />
                <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent opacity-60" />
            </div>
        </div>
    </motion.div>
);

const Hero = () => {
    const { t, language } = useLanguage();

    const services = [
        t("services.onsite"),
        t("services.machinery"),
        t("services.sourcing"),
        t("services.visa"),
    ];

    return (
        <section className="relative min-h-[85vh] flex items-start justify-center overflow-hidden bg-maroon pt-20 lg:pt-28">
            {/* ENHANCED DESIGNER BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                {/* Hanging Lanterns - The "Jhapsa" and Moving elements */}
                <HangingLantern className="top-[-20px] left-[8%] blur-[1px] opacity-20" delay={0} size="w-20" />
                <HangingLantern className="top-[-50px] left-[15%] blur-[4px] opacity-10" delay={1.5} size="w-28" />
                <HangingLantern className="top-[-30px] right-[10%] blur-[2px] opacity-15" delay={0.8} size="w-24" />
                <HangingLantern className="top-[-60px] right-[20%] blur-[6px] opacity-5" delay={2.2} size="sub-w-32" />

                {/* Traditional Chinese Pattern Overlay */}
                <div
                    className="absolute inset-x-0 top-0 h-40 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 40 L40 0 L0 0 Z M2 38 L38 38 L38 2 L2 2 Z M10 30 L30 30 L30 10 L10 10 Z M12 28 L28 28 L28 12 L12 12 Z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat-x'
                    }}
                />

                {/* Floating Chinese Clouds */}
                <motion.div
                    animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[15%] right-[5%] w-64 h-32 opacity-10 text-white"
                >
                    <svg viewBox="0 0 100 50" fill="currentColor">
                        <path d="M20 30 C 10 30 5 25 5 20 C 5 15 10 10 20 10 C 25 10 30 12 35 15 C 40 10 50 10 60 10 C 75 10 85 20 85 30 C 85 40 75 50 60 50 C 50 50 40 50 35 45 C 30 48 25 50 20 50 C 10 50 5 45 5 40 C 5 35 10 30 20 30 Z" />
                    </svg>
                </motion.div>

                {/* Chinese Characters (Subtle Floating) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15, y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-[40%] right-[15%] text-6xl text-primary font-serif select-none"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    翻译
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1, y: [0, 20, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-[30%] left-[12%] text-6xl text-primary font-serif select-none"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    采购
                </motion.div>
            </div>

            <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Badge */}
                    <div className="inline-block mb-4 sm:mb-6 px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full">
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">
                            {t("hero.badge")}
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 leading-[1.2] tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] max-w-5xl mx-auto">
                        {t("hero.headline")}
                    </h1>

                    {/* Subheadline (Services Line) */}
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-4 text-white/70 font-medium mb-10 text-[11px] sm:text-sm md:text-base">
                        {services.map((service, i) => (
                            <React.Fragment key={i}>
                                <span className="whitespace-nowrap hover:text-primary transition-colors cursor-default underline decoration-primary/20 decoration-2 underline-offset-8 decoration-dotted">{service}</span>
                                {i < services.length - 1 && <span className="text-primary/30 hidden sm:inline">|</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14 max-w-sm sm:max-w-none mx-auto">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="tel:+8801700630200"
                            className="w-full sm:w-auto bg-primary text-maroon px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_20px_40px_-10px_rgba(230,45,38,0.3)] flex items-center justify-center gap-3"
                        >
                            <FaPhoneAlt />
                            {t("hero.callNow")}
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                        >
                            <FaCalendarCheck className="text-primary" />
                            {t("hero.bookInterpreter")}
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://wa.me/8801700630200"
                            target="_blank"
                            className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg"
                        >
                            <FaWhatsapp size={20} />
                            {t("hero.whatsappChat")}
                        </motion.a>
                    </div>

                    {/* Secondary Messenger Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-8 border-t border-white/5">
                        <a
                            href="#"
                            className="flex items-center gap-2 text-white/50 hover:text-[#0084FF] transition-all font-bold text-[10px] sm:text-xs md:text-sm group"
                        >
                            <FaFacebookMessenger size={18} className="group-hover:scale-110 transition-transform" />
                            {t("hero.facebookMessenger")}
                        </a>
                        <div className="w-px h-4 bg-white/10 hidden md:block"></div>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-white/50 hover:text-[#07C160] transition-all font-bold text-[10px] sm:text-xs md:text-sm group"
                        >
                            <FaWeixin size={20} className="group-hover:scale-110 transition-transform" />
                            {t("hero.wechatMessenger")} (DulaMia)
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Modern Wave Pattern at Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden pointer-events-none">
                <svg className="absolute bottom-0 w-[200%] h-24 animate-wave fill-maroon" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M0 50 C 250 50 250 100 500 100 C 750 100 750 50 1000 50 L 1000 100 L 0 100 Z" />
                </svg>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-wave {
                    animation: wave 20s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Hero;
