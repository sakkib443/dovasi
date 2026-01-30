"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "react-icons/lu";
import { FiArrowRight, FiCheckCircle, FiZap, FiTarget } from "react-icons/fi";
import Link from "next/link";
import { SERVICES_DATA } from "@/config/servicesData";

const ServiceCard = ({ service, index }) => {
    const Icon = LucideIcons[service.icon] || FiTarget;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
        >
            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-2xl">
                {/* Background Decor */}
                <div className="absolute -top-12 -right-12 text-primary opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-700">
                    <Icon size={180} />
                </div>

                <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-maroon transition-all duration-500 shadow-xl">
                        <Icon size={32} />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1">Expertise</span>
                        <div className="w-8 h-1 bg-primary/30 rounded-full" />
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                    {service.title}
                </h3>

                <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 flex-grow">
                    {service.description}
                </p>

                <div className="space-y-4 mb-10">
                    {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <FiCheckCircle className="text-primary/50 flex-shrink-0" size={14} />
                            <span className="text-white/60 text-[11px] font-bold uppercase tracking-wider">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all"
                    >
                        View Details <FiArrowRight size={14} />
                    </Link>
                    <Link
                        href={`/contact?service=${service.slug}`}
                        className="p-2 text-white/20 hover:text-primary transition-colors"
                    >
                        <FiZap size={18} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-maroon pt-20 pb-20 overflow-hidden selection:bg-primary selection:text-maroon">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[250px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/5 blur-[250px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="container relative z-10 mx-auto px-4 lg:px-20">
                {/* Header Section */}
                <header className="mb-16 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <FiTarget className="text-primary" size={16} />
                        <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">Our Specializations</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
                    >
                        Linguistic & <span className="text-primary italic">Industrial</span> Solutions
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto"
                    >
                        Bridging international trade through specialized interpretation, technical support, and strategic business consultancy in Bangladesh.
                    </motion.p>
                </header>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES_DATA.map((service, index) => (
                        <ServiceCard key={service.slug} service={service} index={index} />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 relative group"
                >
                    <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden">
                        <LucideIcons.LuHeartHandshake className="absolute -top-10 -left-10 text-white/5 w-64 h-64 -rotate-12" />

                        <div className="max-w-3xl mx-auto relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                                Ready to scale your <span className="text-primary italic">Industrial Growth?</span>
                            </h2>
                            <p className="text-white/40 text-lg mb-12 font-medium">
                                Join hundreds of multinational partners who rely on Dovasi for seamless international cooperation and local operational excellence.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    href="/contact"
                                    className="px-12 py-5 bg-primary text-maroon rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all shadow-2xl shadow-primary/20"
                                >
                                    Get Started Today
                                </Link>
                                <button className="px-12 py-5 bg-white/5 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white/10 border border-white/10 transition-all">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ServicesPage;
