"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuExternalLink } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const CaseStudySection = () => {
    const { t } = useLanguage();

    const projects = [
        {
            title: t("portfolio.butterfly"),
            description: t("portfolio.butterflyDesc"),
            tags: ["Machinery", "Onsite", "Technical"],
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
            link: "#"
        },
        {
            title: t("portfolio.textile"),
            description: t("portfolio.textileDesc"),
            tags: ["Sourcing", "Textile", "Negotiation"],
            image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
            link: "#"
        },
        {
            title: t("portfolio.bridge"),
            description: t("portfolio.bridgeDesc"),
            tags: ["Delegation", "Meeting", "Support"],
            image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
            link: "#"
        }
    ];

    return (
        <section className="py-24 bg-maroon-dark">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary font-bold tracking-[0.3em] uppercase text-xs"
                        >
                            {t("portfolio.badge")}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-4xl font-extrabold text-white mt-4"
                        >
                            {t("portfolio.title")}
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-[2rem] bg-card border border-white/5 shadow-2xl"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <a
                                    href={project.link}
                                    className="inline-flex items-center gap-2 text-white font-medium text-sm hover:gap-4 transition-all"
                                >
                                    {t("portfolio.viewDetails")} <LuExternalLink className="text-primary" />
                                </a>
                            </div>

                            {/* Hover Overlay Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudySection;
