"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { LuMessageSquareQuote, LuUsers, LuCheckCircle } from "react-icons/lu";

const TestimonialsPage = () => {
    const testimonials = [
        {
            id: 1,
            review: "Dovasi helped us communicate fluently during our machinery visit to Dhaka. Their expert Chinese interpreter bridge the gap flawlessly. Highly professional and recommended!",
            name: "Li Wei",
            designation: "CEO, Shanghai Industrial Trade",
            rating: 5,
            company: "Shanghai Industrial"
        },
        {
            id: 2,
            review: "The onsite interpretation provided by Dovasi was exceptional. It saved us months of negotiation time with our Chinese partners. Essential service for cross-border trade.",
            name: "Kazi Ariful",
            designation: "Managing Director, Global BD Textiles",
            rating: 5,
            company: "Global BD Textiles"
        },
        {
            id: 3,
            review: "Accurate document translation for our joint venture contracts. They understand both the language and the technical business terminology. The best in Bangladesh.",
            name: "Chen Hao",
            designation: "Export Manager, Tech-Link China",
            rating: 5,
            company: "Tech-Link China"
        },
        {
            id: 4,
            review: "Expert sourcing agent. Found us the exact machinery we needed in Shenzhen and handled all the QC inspections before shipping. Truly a one-stop solution.",
            name: "Mohammad Yusuf",
            designation: "Operation Head, Apex Manufacturing",
            rating: 5,
            company: "Apex Manufacturing"
        },
        {
            id: 5,
            review: "Their tri-lingual expertise (Bengali, Chinese, English) is rare. It made our technical workshop with Chinese engineers very smooth. No communication barrier whatsoever.",
            name: "Zhang Min",
            designation: "Technical Director, Power Grid China",
            rating: 5,
            company: "Power Grid China"
        },
        {
            id: 6,
            review: "Professional, punctual, and highly skilled. Shahadat and his team are the go-to experts for any Chinese business delegation coming to Bangladesh.",
            name: "Rahman Aziz",
            designation: "Founder, Zenith Logistics",
            rating: 5,
            company: "Zenith Logistics"
        }
    ];

    return (
        <div className="min-h-screen bg-maroon pt-16 pb-20">
            {/* Header */}
            <section className="py-24 bg-maroon-dark relative">
                <div className="container mx-auto px-4 lg:px-20 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-8"
                    >
                        <LuMessageSquareQuote size={40} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-extrabold text-white mb-6"
                    >
                        Voices of <span className="text-primary italic">Global Clients</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed font-normal">
                        Join hundreds of satisfied partners who have simplified their cross-border business through Dovasi&apos;s professional language solutions.
                    </p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600 rounded-full blur-[150px]" />
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-card p-10 rounded-md border border-white/5 relative group hover:border-primary/20 transition-all flex flex-col"
                            >
                                <div className="absolute top-0 right-10 transform -translate-y-1/2 w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-maroon shadow-xl group-hover:rotate-6 transition-transform">
                                    <FaQuoteLeft size={20} />
                                </div>

                                <div className="flex gap-1 mb-8">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-primary text-xs" />
                                    ))}
                                </div>

                                <p className="text-white/80 text-base leading-relaxed mb-10 italic font-normal flex-grow">
                                    &quot;{testimonial.review}&quot;
                                </p>

                                <div className="pt-8 border-t border-white/5">
                                    <h4 className="font-bold text-white text-xl">{testimonial.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-primary text-[10px] uppercase tracking-widest font-bold">{testimonial.designation}</p>
                                    </div>
                                    <p className="text-white/30 text-[9px] uppercase tracking-wider mt-0.5">{testimonial.company}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Logos / Trust Section */}
            <section className="py-20 bg-maroon-dark/50 border-y border-white/5 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-20 text-center mb-12">
                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Trusted by 200+ companies worldwide</p>
                </div>

                <div className="relative flex overflow-hidden">
                    <motion.div
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex whitespace-nowrap gap-20 items-center opacity-30 grayscale contrast-125"
                    >
                        {/* First set of logos */}
                        {["BUTTERFLY", "SAMSUNG", "WALTON", "HIKVISION", "TP-LINK", "LG", "SINGER", "XIAOMI"].map((logo, i) => (
                            <div key={i} className="text-2xl md:text-4xl font-black text-white px-4 tracking-tighter">
                                {logo}
                            </div>
                        ))}
                        {/* Second set for seamless loop */}
                        {["BUTTERFLY", "SAMSUNG", "WALTON", "HIKVISION", "TP-LINK", "LG", "SINGER", "XIAOMI"].map((logo, i) => (
                            <div key={`dup-${i}`} className="text-2xl md:text-4xl font-black text-white px-4 tracking-tighter">
                                {logo}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">Success Language is <span className="text-primary italic">Universal</span></h2>
                        <p className="text-gray-400 text-lg mb-12 font-normal">
                            Don&apos;t let language barriers stop your growth. Start your success story with us today.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/contact" className="px-10 py-5 bg-primary text-maroon rounded-md font-black uppercase tracking-widest text-sm hover:bg-white transition-all">
                                Write Your Review
                            </Link>
                            <Link href="/services" className="px-10 py-5 border-2 border-white/10 text-white rounded-md font-black uppercase tracking-widest text-sm hover:border-primary transition-all">
                                View Our Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TestimonialsPage;
