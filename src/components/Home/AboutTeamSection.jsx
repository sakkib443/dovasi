"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaDownload, FaLinkedin, FaGraduationCap, FaLanguage } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const AboutTeamSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-maroon">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left - Main Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7"
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">{t("aboutTeam.badge")}</span>
                        <h2 className="text-xl md:text-3xl font-extrabold text-white mt-3 mb-6">
                            {t("aboutTeam.title1")} <span className="text-primary italic">{t("aboutTeam.title2")}</span>
                        </h2>

                        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                            <p>
                                {t("aboutTeam.intro1")}
                            </p>
                            <p>
                                {t("aboutTeam.intro2")}
                            </p>
                        </div>

                        {/* Credentials Grid */}
                        <div className="grid sm:grid-cols-2 gap-6 mt-12">
                            <div className="p-6 bg-card rounded-2xl border border-white/5 flex gap-4">
                                <FaGraduationCap className="text-primary text-3xl shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold">{t("aboutTeam.cert1Desc")}</h4>
                                    <p className="text-gray-500 text-sm">{t("aboutTeam.cert1")}</p>
                                </div>
                            </div>
                            <div className="p-6 bg-card rounded-2xl border border-white/5 flex gap-4">
                                <FaLanguage className="text-primary text-3xl shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold">{t("aboutTeam.cert2")}</h4>
                                    <p className="text-gray-500 text-sm">{t("aboutTeam.cert2Desc")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-12">
                            <button className="flex items-center gap-3 bg-primary text-maroon hover:bg-white px-8 py-4 rounded-xl font-medium transition-all shadow-xl">
                                <FaDownload />
                                {t("aboutTeam.downloadResume")}
                            </button>
                            <a href="#" className="flex items-center gap-3 border-2 border-white/20 text-white hover:border-primary px-8 py-4 rounded-xl font-medium transition-all">
                                <FaLinkedin className="text-[#0A66C2]" />
                                {t("aboutTeam.linkedin")}
                            </a>
                        </div>
                    </motion.div>

                    {/* Right - Profile & Team Card */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Main Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border-8 border-white/5 bg-card shadow-2xl relative z-10">
                                <img
                                    src="/images/image.png"
                                    alt="E. Shahadat"
                                    className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                                />
                            </div>
                            {/* Accent Boxes */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-3xl blur-2xl" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary rounded-3xl z-0" />

                            <div className="absolute bottom-10 right-0 left-0 px-6 z-20">
                                <div className="bg-card/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white">E. Shahadat</h3>
                                    <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">{t("aboutTeam.founderTitle")}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Team Info Small Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-primary p-8 rounded-[2.5rem] shadow-2xl text-maroon"
                        >
                            <h4 className="text-sm font-bold mb-3 flex items-center gap-3">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                {t("aboutTeam.teamTitle")}
                            </h4>
                            <p className="font-bold opacity-80 text-[11px] mb-4 leading-relaxed">
                                {t("aboutTeam.teamDesc")}
                            </p>
                            <button className="w-full py-4 bg-maroon text-primary rounded-xl font-bold hover:bg-white transition-all text-sm uppercase tracking-widest">
                                {t("aboutTeam.viewPortfolio")}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTeamSection;
