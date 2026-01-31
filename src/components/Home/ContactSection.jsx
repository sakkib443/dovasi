"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault();
        const text = `Hi Dovasi, I am ${formData.name}. %0AEmail: ${formData.email} %0APhone: ${formData.phone} %0AService: ${formData.service} %0AMessage: ${formData.message}`;
        window.open(`https://wa.me/8801700630200?text=${text}`, "_blank");
    };

    return (
        <section className="py-24 bg-maroon-dark" id="contact">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Left Side: Contact Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">{t("contact.badge")}</span>
                        <h2 className="text-2xl md:text-5xl font-extrabold text-white mt-4 mb-8">
                            {t("contact.title1")} <br /> <span className="text-primary italic">{t("contact.title2")}</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            {t("contact.desc")}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-maroon transition-all shadow-xl">
                                    <FaWhatsapp size={24} />
                                </div>
                                <div className="text-white">
                                    <h4 className="font-bold text-lg">{t("contact.instantMessage")}</h4>
                                    <p className="text-gray-500 font-medium">+880 1700-630200</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-card p-10 lg:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden"
                    >
                        <form onSubmit={handleWhatsAppSubmit} className="space-y-6 relative z-10">
                            {/* Name Input */}
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
                                <input
                                    type="text"
                                    placeholder={t("contact.namePlaceholder")}
                                    required
                                    className="w-full bg-card-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-primary outline-none transition-all"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* Email & Phone */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
                                    <input
                                        type="email"
                                        placeholder={t("contact.emailPlaceholder")}
                                        className="w-full bg-card-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-primary outline-none transition-all"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
                                    <input
                                        type="tel"
                                        placeholder={t("contact.phonePlaceholder")}
                                        required
                                        className="w-full bg-card-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-primary outline-none transition-all"
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Service Type Selection */}
                            <div className="relative">
                                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
                                <select
                                    className="w-full bg-card-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all appearance-none"
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                >
                                    <option value="" disabled selected>{t("contact.selectService")}</option>
                                    <option value="Interpretation">{t("contact.serviceOptions.interpretation")}</option>
                                    <option value="Sourcing">{t("contact.serviceOptions.sourcing")}</option>
                                    <option value="Technical">{t("contact.serviceOptions.technical")}</option>
                                    <option value="Visa">{t("contact.serviceOptions.visa")}</option>
                                    <option value="Other">{t("contact.serviceOptions.other")}</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <textarea
                                    placeholder={t("contact.messagePlaceholder")}
                                    rows="4"
                                    className="w-full bg-card-dark/50 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/20 focus:border-primary outline-none transition-all"
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-maroon hover:bg-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/10"
                            >
                                <FaPaperPlane />
                                {t("contact.sendBtn")}
                            </button>
                        </form>

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
