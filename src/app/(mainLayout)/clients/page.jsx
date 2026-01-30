"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuExternalLink, LuBriefcase, LuUsers, LuCheck } from "react-icons/lu";

const ClientsPage = () => {
    const projects = [
        {
            title: "Butterfly Manufacturing Co. Ltd",
            client: "Butterfly Group",
            description: "Onsite machinery installation and technical workshop interpretation for the new appliance factory.",
            tags: ["Machinery", "Onsite", "Technical"],
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
            category: "Industrial"
        },
        {
            title: "Sourcing for Mega Textile Hub",
            client: "Textile Sourcing Co.",
            description: "Sourcing direct industrial knitting machines from Shenzhen and coordinating logistics.",
            tags: ["Sourcing", "Textile", "Negotiation"],
            image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
            category: "Sourcing"
        },
        {
            title: "Bridge Construction Delegation",
            client: "Bridge Dev China",
            description: "High-level bilateral business meeting interpretation for a state-owned infrastructure project.",
            tags: ["Delegation", "Meeting", "Support"],
            image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
            category: "Infrastructure"
        },
        {
            title: "Automotive Assembly Line Support",
            client: "BD Motors Ltd",
            description: "Technical translation of operation manuals and onsite support for assembly line technicians.",
            tags: ["Automotive", "Technical", "Support"],
            image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
            category: "Industrial"
        },
        {
            title: "Pharma Packaging Machinery",
            client: "HealthCare Pharma",
            description: "Interpretation for Chinese engineers setting up high-speed blister packing machines.",
            tags: ["Pharmaceutical", "Onsite", "Machinery"],
            image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&q=80",
            category: "Pharma"
        },
        {
            title: "Raw Material Sourcing - Guangzhou",
            client: "Fashion Fabrics BD",
            description: "End-to-end sourcing of premium apparel fabrics and factory verification in Guangzhou.",
            tags: ["Sourcing", "Fashion", "Logistics"],
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
            category: "Sourcing"
        }
    ];

    const stats = [
        { label: "Happy Clients", value: "200+", icon: LuUsers },
        { label: "Successful Projects", value: "500+", icon: LuBriefcase },
        { label: "Years Experience", value: "10+", icon: LuCheck },
    ];

    return (
        <div className="min-h-screen bg-maroon pt-16 pb-20">
            {/* Header */}
            <section className="py-20 bg-maroon-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
                </div>

                <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Our Clients & Portfolio
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-extrabold text-white mb-6"
                    >
                        Success Built on <span className="text-primary italic">Global Partnership</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base">
                        Trusted by industry leaders across China and Bangladesh for seamless communication and efficient business operations.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-maroon border-y border-white/5">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-6 p-8 bg-maroon-dark rounded-2xl border border-white/5"
                            >
                                <stat.icon size={32} className="text-primary" />
                                <div>
                                    <h3 className="text-2xl font-black text-white leading-none mb-1">{stat.value}</h3>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px]">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-md bg-maroon-dark border border-white/5 shadow-2xl"
                            >
                                {/* Image Container */}
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary text-maroon rounded-md text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-[9px] font-bold uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{project.client}</h4>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                                        {project.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                        View Case Study <LuExternalLink className="text-primary" />
                                    </div>
                                </div>

                                {/* Hover Overlay Accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="pb-24">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="bg-primary p-12 lg:p-16 rounded-md text-maroon text-center relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Start a Project?</h2>
                            <p className="text-maroon/70 font-bold mb-10 max-w-xl mx-auto">
                                Join our network of successful global partners. Let us handle your linguistic and sourcing challenges.
                            </p>
                            <a href="/contact" className="inline-block bg-maroon text-primary px-10 py-5 rounded-md font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-xl">
                                Become a Client
                            </a>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClientsPage;
