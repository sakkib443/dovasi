"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWeixin, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const QRCodeSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-maroon">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">{t("qrcodes.badge")}</span>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-4 mb-6 leading-tight">
                            {t("qrcodes.title1")} <br />
                            <span className="text-primary italic">{t("qrcodes.title2")}</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            {t("qrcodes.desc")}
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-5 p-6 bg-maroon-dark rounded-2xl border border-white/5">
                                <div className="w-12 h-12 bg-[#07C160] rounded-xl flex items-center justify-center text-white shrink-0">
                                    <FaWeixin size={28} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t("qrcodes.wechatId")}</h4>
                                    <p className="text-gray-500 text-sm">{t("qrcodes.wechatDesc")}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 p-6 bg-maroon-dark rounded-2xl border border-white/5">
                                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white shrink-0">
                                    <FaWhatsapp size={28} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t("qrcodes.whatsappPhone")}</h4>
                                    <p className="text-gray-500 text-sm">{t("qrcodes.whatsappDesc")}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - QR Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl aspect-square bg-white flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-8 p-10">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-gray-100 rounded-2xl">
                                        <FaWeixin size={80} className="text-[#07C160]" />
                                    </div>
                                    <span className="text-maroon font-black text-xs">{t("qrcodes.scanWechat")}</span>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-gray-100 rounded-2xl">
                                        <FaWhatsapp size={80} className="text-[#25D366]" />
                                    </div>
                                    <span className="text-maroon font-black text-xs">{t("qrcodes.scanWhatsapp")}</span>
                                </div>
                            </div>
                            {/* Overlay Accent */}
                            <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Decorative Badge */}
                        <motion.div
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full flex flex-col items-center justify-center text-maroon text-center p-4 border-8 border-maroon shadow-2xl z-20"
                        >
                            <span className="font-black text-xl leading-none uppercase">{t("qrcodes.scanNow")}</span>
                            <span className="text-[8px] font-bold uppercase tracking-tighter mt-1">{t("qrcodes.scanQuote")}</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default QRCodeSection;
