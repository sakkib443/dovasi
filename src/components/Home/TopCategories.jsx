"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    LuLanguages,
    LuFileText,
    LuCpu,
    LuShip,
    LuLandmark,
    LuBriefcase,
    LuSearch,
    LuMic,
    LuChevronRight,
    LuSettings,
    LuUsers
} from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const TopCategories = () => {
    const { t } = useLanguage();

    const categories = [
        {
            icon: LuLanguages,
            titleKey: 'chinese',
            slug: 'chinese-interpreter',
            iconBg: 'bg-gradient-to-br from-red-500 to-red-700',
            borderColor: 'border-l-primary',
        },
        {
            icon: LuMic,
            titleKey: 'korean',
            slug: 'korean-interpreter',
            iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
            borderColor: 'border-l-blue-400',
        },
        {
            icon: LuUsers,
            titleKey: 'japanese',
            slug: 'japanese-interpreter',
            iconBg: 'bg-gradient-to-br from-red-600 to-red-800',
            borderColor: 'border-l-red-400',
        },
        {
            icon: LuShip,
            titleKey: 'sourcing',
            slug: 'sourcing-agent',
            iconBg: 'bg-gradient-to-br from-amber-500 to-primary',
            borderColor: 'border-l-amber-500',
        },
        {
            icon: LuLandmark,
            titleKey: 'setup',
            slug: 'business-setup',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
            borderColor: 'border-l-emerald-500',
        },
        {
            icon: LuFileText,
            titleKey: 'visa',
            slug: 'business-visa',
            iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
            borderColor: 'border-l-indigo-400',
        },
        {
            icon: LuSearch,
            titleKey: 'audit',
            slug: 'supplier-audit',
            iconBg: 'bg-gradient-to-br from-gray-600 to-gray-800',
            borderColor: 'border-l-gray-400',
        },
        {
            icon: LuSettings,
            titleKey: 'translation',
            slug: 'technical-translation',
            iconBg: 'bg-gradient-to-br from-orange-500 to-orange-700',
            borderColor: 'border-l-orange-400',
        },
    ];

    return (
        <section className="py-24 bg-maroon-dark">
            <div className="container mx-auto px-4 lg:px-20">
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-xs"
                    >
                        {t("top_categories.badge", "Our Expertise")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-5xl font-extrabold text-white mt-4"
                    >
                        {t("top_categories.title1", "Linguistic & ")} <span className="text-primary italic">{t("top_categories.title2", "Industrial Solutions")}</span>
                    </motion.h2>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <div className={`group bg-maroon p-8 rounded-3xl border-l-4 ${category.borderColor} shadow-2xl hover:shadow-primary/10 border border-white/5 hover:border-white/10 transition-all duration-300 h-full flex flex-col`}>
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-16 h-16 rounded-2xl ${category.iconBg} flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform`}>
                                        <category.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-white/20 group-hover:text-primary transition-colors">
                                        <LuChevronRight className="w-8 h-8 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {t(`top_categories.items.${category.titleKey}.title`)}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                    {t(`top_categories.items.${category.titleKey}.subtitle`)}
                                </p>

                                <div className="pt-6 border-t border-white/5">
                                    <Link
                                        href={`/services/${category.slug}`}
                                        className="text-[10px] font-black text-primary uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all"
                                    >
                                        {t("top_categories.learnMore", "Learn More Details")}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCategories;
