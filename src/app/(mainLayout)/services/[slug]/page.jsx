'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    FiArrowLeft,
    FiCheckCircle,
    FiBriefcase,
    FiArrowRight,
    FiPhoneCall,
    FiGlobe,
    FiShield,
    FiZap
} from 'react-icons/fi';
import * as LucideIcons from 'react-icons/lu';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES_DATA } from '@/config/servicesData';

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;
    const { language, t: translate } = useLanguage();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        const foundService = SERVICES_DATA.find(s => s.slug === slug);
        if (foundService) {
            setService(foundService);
        } else {
            // Uncomment to redirect if service not found
            // router.push('/');
        }
        setLoading(false);
    }, [slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-maroon flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
                />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-maroon flex items-center justify-center">
                <div className="text-center">
                    <FiBriefcase className="text-primary mx-auto mb-6" size={64} />
                    <h2 className="text-2xl font-black text-white mb-2 underline decoration-primary">Service Not Found</h2>
                    <Link href="/" className="text-primary font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">← Back to Home</Link>
                </div>
            </div>
        );
    }

    const ServiceIcon = LucideIcons[service.icon] || FiBriefcase;

    return (
        <div className="min-h-screen bg-maroon selection:bg-primary selection:text-maroon font-poppins antialiased overflow-x-hidden">

            {/* Service Hero Header */}
            <header className="relative pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-10 scale-110 blur-[2px]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-maroon/50 via-maroon to-maroon" />
                </div>

                <div className="container mx-auto px-4 lg:px-20 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-maroon hover:border-primary transition-all duration-300"
                        >
                            <FiArrowLeft size={14} /> Back to Expertise
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-md">
                                    <ServiceIcon className="text-primary" size={18} />
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                        {service.badge}
                                    </span>
                                </div>

                                <h1 className={`text-3xl md:text-5xl font-black text-white leading-tight ${bengaliClass}`}>
                                    {service.title}
                                </h1>

                                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Link
                                        href="/contact"
                                        className="px-8 py-4 bg-primary text-maroon rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-2xl flex items-center gap-3 group"
                                    >
                                        Enquire Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <button className="px-8 py-4 bg-white/5 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 border border-white/10 transition-all flex items-center gap-3">
                                        <FiPhoneCall size={16} /> Contact Support
                                    </button>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative hidden lg:block"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 to-transparent" />
                                </div>

                                {/* Floating Specs Card */}
                                <div className="absolute -bottom-8 -left-8 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl max-w-[200px]">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                            <FiShield size={16} />
                                        </div>
                                        <p className="text-[10px] font-bold text-white uppercase tracking-wider">Certified</p>
                                    </div>
                                    <p className="text-[9px] text-white/40 leading-tight">Accredited by industrial standards in Bangladesh.</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Service Details Main Content */}
            <main className="pb-32 relative">
                {/* Background Decor */}
                <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-orange-500/5 blur-[200px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Left Column: Detailed Content */}
                        <div className="lg:col-span-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                <div className="lg:col-span-7 space-y-12">
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl">
                                        <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-4">
                                            <div className="w-1.5 h-8 bg-primary rounded-full" />
                                            Overview
                                        </h2>
                                        <div
                                            className={`prose prose-invert prose-lg max-w-none 
                                            prose-p:text-white/60 prose-p:leading-relaxed
                                            prose-headings:text-white prose-headings:font-black
                                            prose-strong:text-primary
                                            ${bengaliClass}`}
                                            dangerouslySetInnerHTML={{ __html: service.detailedContent }}
                                        />
                                    </section>
                                </div>

                                {/* Right Column: Key Features & CTA */}
                                <div className="lg:col-span-5 space-y-8">
                                    {/* Features Card */}
                                    <section className="bg-card rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 text-primary opacity-10 group-hover:scale-125 transition-transform duration-700">
                                            <FiZap size={120} />
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-8 border-b border-white/5 pb-4 uppercase tracking-[0.2em]">
                                            Key Features
                                        </h3>
                                        <ul className="space-y-6">
                                            {service.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="flex items-start gap-4"
                                                >
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 shadow-lg shadow-primary/20">
                                                        <FiCheckCircle size={12} />
                                                    </div>
                                                    <span className="text-white/70 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Benefits Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                                            <p className="text-3xl font-black text-primary mb-1">99%</p>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Accuracy Rate</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                                            <p className="text-3xl font-black text-primary mb-1">500+</p>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Projects Done</p>
                                        </div>
                                    </div>

                                    {/* Sidebar CTA */}
                                    <div className="bg-gradient-to-br from-primary to-orange-600 rounded-[2.5rem] p-10 relative overflow-hidden group">
                                        <div className="relative z-10 text-center">
                                            <h3 className="text-2xl font-black text-maroon mb-4">Start Your Project</h3>
                                            <p className="text-maroon/70 text-sm mb-8 font-bold leading-relaxed">Let our experienced team handle the linguistic and technical complexities of your business.</p>
                                            <Link href="/contact" className="inline-block w-full py-5 bg-maroon text-primary rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-maroon transition-all shadow-2xl">
                                                Book a Consultation
                                            </Link>
                                        </div>
                                        {/* Decorative Icon */}
                                        <FiGlobe className="absolute -bottom-10 -right-10 text-black/10 w-48 h-48 rotate-12 group-hover:rotate-45 transition-all duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
