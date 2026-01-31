"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaBolt, FaWater, FaFire, FaShieldAlt, FaTruck, FaWhatsapp, FaCheck } from "react-icons/fa";
import { LuArrowRight, LuMapPin, LuRuler, LuPhone } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const FactoryShedPage = () => {
    const { t } = useLanguage();
    const [activeSize, setActiveSize] = useState("all");
    const [activeZone, setActiveZone] = useState("all");

    const sizes = [
        { id: "all", label: "All Sizes" },
        { id: "small", label: t("factoryShed.sizes.small") },
        { id: "medium", label: t("factoryShed.sizes.medium") },
        { id: "large", label: t("factoryShed.sizes.large") },
        { id: "xlarge", label: t("factoryShed.sizes.xlarge") },
    ];

    const zones = [
        { id: "all", label: "All Zones" },
        { id: "dhaka", label: t("factoryShed.zones.dhaka") },
        { id: "chittagong", label: t("factoryShed.zones.chittagong") },
        { id: "gazipur", label: t("factoryShed.zones.gazipur") },
        { id: "narayanganj", label: t("factoryShed.zones.narayanganj") },
    ];

    const features = [
        { icon: FaBolt, key: "electricity", color: "text-yellow-400" },
        { icon: FaWater, key: "water", color: "text-blue-400" },
        { icon: FaFire, key: "gas", color: "text-orange-400" },
        { icon: FaShieldAlt, key: "security", color: "text-green-400" },
        { icon: FaTruck, key: "parking", color: "text-purple-400" },
        { icon: FaBuilding, key: "office", color: "text-pink-400" },
    ];

    const listings = [
        {
            id: 1,
            size: "medium",
            zone: "gazipur",
            sqft: "15,000",
            price: "৳80/sqft",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
            features: ["electricity", "water", "security", "parking"]
        },
        {
            id: 2,
            size: "large",
            zone: "dhaka",
            sqft: "35,000",
            price: "৳120/sqft",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600",
            features: ["electricity", "water", "gas", "security", "parking", "office"]
        },
        {
            id: 3,
            size: "small",
            zone: "narayanganj",
            sqft: "8,000",
            price: "৳65/sqft",
            image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600",
            features: ["electricity", "water", "security"]
        },
        {
            id: 4,
            size: "xlarge",
            zone: "chittagong",
            sqft: "60,000",
            price: "৳100/sqft",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
            features: ["electricity", "water", "gas", "security", "parking", "office"]
        },
        {
            id: 5,
            size: "medium",
            zone: "gazipur",
            sqft: "20,000",
            price: "৳85/sqft",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
            features: ["electricity", "water", "gas", "security", "parking"]
        },
        {
            id: 6,
            size: "large",
            zone: "dhaka",
            sqft: "40,000",
            price: "৳130/sqft",
            image: "https://images.unsplash.com/photo-1486607735355-31f9a6e12989?w=600",
            features: ["electricity", "water", "gas", "security", "parking", "office"]
        }
    ];

    const filteredListings = listings.filter(item => {
        const sizeMatch = activeSize === "all" || item.size === activeSize;
        const zoneMatch = activeZone === "all" || item.zone === activeZone;
        return sizeMatch && zoneMatch;
    });

    return (
        <div className="min-h-screen bg-maroon">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark to-maroon opacity-95" />
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-20 right-20 w-80 h-80 border-4 border-primary rounded-full" />
                    <div className="absolute bottom-20 left-20 w-60 h-60 border-4 border-secondary rounded-full" />
                </div>

                <div className="container mx-auto px-4 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6">
                            <FaBuilding className="inline mr-2" />
                            {t("factoryShed.badge")}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            {t("factoryShed.title1")} <span className="text-primary italic">{t("factoryShed.title2")}</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            {t("factoryShed.subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-maroon-dark py-16">
                <div className="container mx-auto px-4 lg:px-20">
                    <h2 className="text-2xl font-bold text-white text-center mb-12">
                        Available <span className="text-primary">Features</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {features.map((feature) => (
                            <div
                                key={feature.key}
                                className="bg-card p-6 rounded-2xl text-center border border-white/5 hover:border-primary/30 transition-all"
                            >
                                <feature.icon className={`w-8 h-8 mx-auto mb-3 ${feature.color}`} />
                                <p className="text-white/80 text-sm font-medium">
                                    {t(`factoryShed.features.${feature.key}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="container mx-auto px-4 lg:px-20 py-12">
                <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                    {/* Size Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="text-white/50 text-sm font-bold mr-2 self-center">Size:</span>
                        {sizes.map((size) => (
                            <button
                                key={size.id}
                                onClick={() => setActiveSize(size.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSize === size.id
                                    ? "bg-primary text-maroon"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-white/10 hidden lg:block" />

                    {/* Zone Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="text-white/50 text-sm font-bold mr-2 self-center">Zone:</span>
                        {zones.map((zone) => (
                            <button
                                key={zone.id}
                                onClick={() => setActiveZone(zone.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeZone === zone.id
                                    ? "bg-secondary text-maroon"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {zone.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Listings Grid */}
            <section className="container mx-auto px-4 lg:px-20 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredListings.map((listing, index) => (
                        <motion.div
                            key={listing.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={listing.image}
                                    alt={`Factory Shed ${listing.sqft} sqft`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-maroon text-xs font-bold rounded-full">
                                    {t(`factoryShed.zones.${listing.zone}`)}
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full">
                                    {listing.price}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <LuRuler className="text-primary" />
                                    <span className="text-white font-bold text-xl">{listing.sqft} sqft</span>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {listing.features.map((feat) => (
                                        <span
                                            key={feat}
                                            className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg text-xs text-white/60"
                                        >
                                            <FaCheck className="text-green-400" size={10} />
                                            {t(`factoryShed.features.${feat}`)}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <a
                                        href={`https://wa.me/8801700630200?text=I'm interested in Factory Shed: ${listing.sqft} sqft in ${listing.zone}`}
                                        target="_blank"
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                                    >
                                        <FaWhatsapp />
                                        {t("factoryShed.inquireNow")}
                                    </a>
                                    <a
                                        href="tel:+8801700630200"
                                        className="w-12 h-12 flex items-center justify-center bg-white/5 text-primary rounded-xl hover:bg-primary hover:text-maroon transition-all"
                                    >
                                        <LuPhone />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredListings.length === 0 && (
                    <div className="text-center py-20">
                        <FaBuilding className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <p className="text-white/50 text-lg">No factory sheds found matching your criteria.</p>
                        <button
                            onClick={() => { setActiveSize("all"); setActiveZone("all"); }}
                            className="mt-4 text-primary hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-16">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-extrabold text-maroon mb-4">
                                Can't Find What You Need?
                            </h2>
                            <p className="text-maroon/70 max-w-xl">
                                We have access to hundreds of factory spaces across Bangladesh. Tell us your requirements and we'll find the perfect match.
                            </p>
                        </div>
                        <a
                            href="https://wa.me/8801700630200?text=I need help finding a factory shed"
                            target="_blank"
                            className="flex items-center gap-3 bg-maroon text-primary px-8 py-5 rounded-2xl font-bold text-lg hover:bg-maroon-dark transition-all shadow-2xl whitespace-nowrap"
                        >
                            {t("factoryShed.scheduleVisit")}
                            <LuArrowRight />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FactoryShedPage;
