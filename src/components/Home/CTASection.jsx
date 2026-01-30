"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLongArrowAltRight, FaRegHandshake } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const CTASection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-maroon">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Hire Professional Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-maroon-dark p-10 lg:p-14 rounded-[3rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                                <FaRegHandshake size={32} />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                                {t("cta.hireTitle1")} <br /> <span className="text-primary italic">{t("cta.hireTitle2")}</span>
                            </h3>
                            <p className="text-gray-400 text-lg mb-10 max-w-sm">
                                {t("cta.hireDesc")}
                            </p>
                            <Link
                                href="/contact"
                                className="mt-auto inline-flex items-center gap-3 text-primary font-bold tracking-widest uppercase text-sm hover:gap-5 transition-all"
                            >
                                {t("cta.hireBtn")} <FaLongArrowAltRight size={20} />
                            </Link>
                        </div>
                        {/* Background Accent */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    </motion.div>

                    {/* Consulting Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-red-900 to-maroon-dark p-10 lg:p-14 rounded-[3rem] border border-white/10 relative overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8">
                                <LuGlobe size={32} />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                                {t("cta.consultTitle1")} <br /> <span className="text-amber-400 italic">{t("cta.consultTitle2")}</span>
                            </h3>
                            <p className="text-gray-100/70 text-lg mb-10 max-w-sm">
                                {t("cta.consultDesc")}
                            </p>
                            <Link
                                href="/services"
                                className="mt-auto inline-flex items-center gap-4 bg-primary text-maroon px-8 py-4 rounded-2xl font-bold hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/10"
                            >
                                {t("cta.consultBtn")}
                            </Link>
                        </div>
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/chinese-lanterns.png')`, backgroundSize: '200px' }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
