"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaCar, FaUserTie, FaWhatsapp, FaCamera } from "react-icons/fa";
import { LuArrowRight, LuCalendar, LuStar } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const SightseeingPage = () => {
    const { t } = useLanguage();
    const [activePackage, setActivePackage] = useState("halfDay");

    const packages = [
        { id: "halfDay", icon: "🌅", duration: "4-5 hours", price: "৳8,000" },
        { id: "fullDay", icon: "☀️", duration: "8-10 hours", price: "৳15,000" },
        { id: "custom", icon: "⭐", duration: "Flexible", price: "Contact Us" },
    ];

    const spots = [
        {
            id: "lalbagh",
            image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600",
            rating: 4.8,
            reviews: 2500
        },
        {
            id: "ahsan",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
            rating: 4.7,
            reviews: 1800
        },
        {
            id: "hatirjheel",
            image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600",
            rating: 4.6,
            reviews: 3200
        },
        {
            id: "parliament",
            image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600",
            rating: 4.9,
            reviews: 1500
        },
        {
            id: "sadarghat",
            image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600",
            rating: 4.5,
            reviews: 2100
        },
        {
            id: "sonargaon",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
            rating: 4.6,
            reviews: 900
        }
    ];

    return (
        <div className="min-h-screen bg-maroon">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-maroon to-maroon-light opacity-90" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6">
                            <FaCamera className="inline mr-2" />
                            {t("sightseeing.badge")}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            {t("sightseeing.title1")} <span className="text-primary italic">{t("sightseeing.title2")}</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
                            {t("sightseeing.subtitle")}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center gap-6 text-white/70">
                            <div className="flex items-center gap-2">
                                <FaUserTie className="text-primary" />
                                <span className="text-sm">{t("sightseeing.includesGuide")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCar className="text-primary" />
                                <span className="text-sm">{t("sightseeing.transport")}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tour Packages */}
            <section className="container mx-auto px-4 lg:px-20 py-16">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12">
                    Choose Your <span className="text-primary">Tour Package</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                    {packages.map((pkg) => (
                        <motion.button
                            key={pkg.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActivePackage(pkg.id)}
                            className={`p-8 rounded-3xl text-center transition-all ${activePackage === pkg.id
                                ? "bg-primary text-maroon shadow-2xl shadow-primary/30"
                                : "bg-maroon-dark text-white border border-white/10 hover:border-primary/30"
                                }`}
                        >
                            <div className="text-4xl mb-4">{pkg.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{t(`sightseeing.packages.${pkg.id}`)}</h3>
                            <p className={`text-sm mb-4 ${activePackage === pkg.id ? "text-maroon/70" : "text-white/50"}`}>
                                {pkg.duration}
                            </p>
                            <div className="text-2xl font-extrabold">{pkg.price}</div>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Tourist Spots */}
            <section className="bg-maroon-dark py-20">
                <div className="container mx-auto px-4 lg:px-20">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-4">
                        Popular <span className="text-primary">Destinations</span>
                    </h2>
                    <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
                        Explore the rich history and culture of Bangladesh with our guided tours
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {spots.map((spot, index) => (
                            <motion.div
                                key={spot.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={spot.image}
                                        alt={t(`sightseeing.spots.${spot.id}.name`)}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                                        <LuStar className="text-primary fill-primary" size={14} />
                                        <span className="text-white text-sm font-bold">{spot.rating}</span>
                                        <span className="text-white/50 text-xs">({spot.reviews})</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        {t(`sightseeing.spots.${spot.id}.name`)}
                                    </h3>
                                    <p className="text-white/50 text-sm mb-4 line-clamp-2">
                                        {t(`sightseeing.spots.${spot.id}.desc`)}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-primary">
                                            <FaClock size={14} />
                                            <span className="text-sm font-bold">
                                                {t(`sightseeing.spots.${spot.id}.duration`)}
                                            </span>
                                        </div>
                                        <FaMapMarkerAlt className="text-white/30" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary to-secondary py-16">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-extrabold text-maroon mb-4">
                                Ready to Explore Dhaka?
                            </h2>
                            <p className="text-maroon/70 max-w-xl">
                                Book a tour now and let your Chinese guests experience the beauty of Bangladesh with our professional Chinese-speaking guides.
                            </p>
                        </div>
                        <a
                            href="https://wa.me/8801700630200?text=I want to book a Dhaka sightseeing tour"
                            target="_blank"
                            className="flex items-center gap-3 bg-maroon text-primary px-8 py-5 rounded-2xl font-bold text-lg hover:bg-maroon-dark transition-all shadow-2xl whitespace-nowrap"
                        >
                            <FaWhatsapp size={24} />
                            {t("sightseeing.bookTour")}
                            <LuArrowRight />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SightseeingPage;
