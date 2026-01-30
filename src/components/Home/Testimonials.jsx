"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const Testimonials = () => {
    const { t } = useLanguage();

    const testimonials = [
        {
            id: 1,
            review: t("testimonials.items.1.review"),
            name: t("testimonials.items.1.name"),
            designation: t("testimonials.items.1.designation"),
            rating: 5
        },
        {
            id: 2,
            review: t("testimonials.items.2.review"),
            name: t("testimonials.items.2.name"),
            designation: t("testimonials.items.2.designation"),
            rating: 5
        },
        {
            id: 3,
            review: t("testimonials.items.3.review"),
            name: t("testimonials.items.3.name"),
            designation: t("testimonials.items.3.designation"),
            rating: 5
        }
    ];

    return (
        <section className="py-20 bg-maroon-dark">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-4xl font-bold text-white mb-6"
                    >
                        {t("testimonials.title")} <br /> <span className="text-primary italic">{t("testimonials.subtitle")}</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t("testimonials.desc")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-maroon p-10 rounded-3xl border border-white/5 relative group"
                        >
                            <div className="absolute top-0 right-10 transform -translate-y-1/2 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-maroon shadow-xl group-hover:rotate-6 transition-transform">
                                <FaQuoteLeft size={24} />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-primary text-sm" />
                                ))}
                            </div>

                            <p className="text-white/90 text-[15px] leading-relaxed mb-8 italic italic-font">
                                &quot;{testimonial.review}&quot;
                            </p>

                            <div>
                                <h4 className="font-bold text-white text-xl">{testimonial.name}</h4>
                                <p className="text-primary text-sm uppercase tracking-widest font-bold mt-1">{testimonial.designation}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
