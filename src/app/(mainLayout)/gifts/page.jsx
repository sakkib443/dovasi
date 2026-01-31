"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaGift, FaHeart, FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuPackage } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const GiftsPage = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: t("giftShop.categories.all") },
        { id: "handicraft", name: t("giftShop.categories.handicraft") },
        { id: "textile", name: t("giftShop.categories.textile") },
        { id: "souvenir", name: t("giftShop.categories.souvenir") },
        { id: "food", name: t("giftShop.categories.food") },
    ];

    const gifts = [
        {
            id: "jamdani",
            category: "textile",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
            price: "৳15,000 - ৳50,000",
            featured: true
        },
        {
            id: "nakshikantha",
            category: "textile",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
            price: "৳3,000 - ৳15,000",
            featured: true
        },
        {
            id: "brass",
            category: "handicraft",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
            price: "৳2,000 - ৳20,000",
            featured: false
        },
        {
            id: "pottery",
            category: "handicraft",
            image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500",
            price: "৳500 - ৳5,000",
            featured: false
        },
        {
            id: "panjabi",
            category: "textile",
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
            price: "৳2,000 - ৳8,000",
            featured: true
        },
        {
            id: "hilsa",
            category: "food",
            image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=500",
            price: "৳1,500 - ৳3,000/kg",
            featured: false
        }
    ];

    const filteredGifts = activeCategory === "all"
        ? gifts
        : gifts.filter(g => g.category === activeCategory);

    return (
        <div className="min-h-screen bg-maroon">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark to-maroon opacity-90" />
                <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6">
                            <FaGift className="inline mr-2" />
                            {t("giftShop.badge")}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            {t("giftShop.title1")} <span className="text-primary italic">{t("giftShop.title2")}</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            {t("giftShop.subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <div className="container mx-auto px-4 lg:px-20 py-8">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeCategory === cat.id
                                ? "bg-primary text-maroon shadow-lg shadow-primary/30"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gift Items Grid */}
            <section className="container mx-auto px-4 lg:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredGifts.map((gift, index) => (
                        <motion.div
                            key={gift.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={gift.image}
                                    alt={t(`giftShop.items.${gift.id}.name`)}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {gift.featured && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-maroon text-xs font-bold rounded-full">
                                        Featured
                                    </div>
                                )}
                                <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-maroon transition-all">
                                    <FaHeart />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {t(`giftShop.items.${gift.id}.name`)}
                                </h3>
                                <p className="text-white/50 text-sm mb-4 line-clamp-2">
                                    {t(`giftShop.items.${gift.id}.desc`)}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary font-bold text-lg">{gift.price}</span>
                                    <a
                                        href={`https://wa.me/8801700630200?text=I'm interested in ${t(`giftShop.items.${gift.id}.name`)}`}
                                        target="_blank"
                                        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                                    >
                                        <FaWhatsapp />
                                        {t("giftShop.orderNow")}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-16">
                <div className="container mx-auto px-4 lg:px-20 text-center">
                    <LuPackage className="w-16 h-16 text-maroon mx-auto mb-6" />
                    <h2 className="text-2xl md:text-4xl font-extrabold text-maroon mb-4">
                        Need Custom Gift Packages?
                    </h2>
                    <p className="text-maroon/70 max-w-2xl mx-auto mb-8">
                        We can curate personalized gift sets for your Chinese guests. Contact us for bulk orders and custom packaging.
                    </p>
                    <a
                        href="https://wa.me/8801700630200?text=I need custom gift packages"
                        target="_blank"
                        className="inline-flex items-center gap-3 bg-maroon text-primary px-8 py-4 rounded-2xl font-bold hover:bg-maroon-dark transition-all shadow-xl"
                    >
                        Contact for Custom Orders
                        <LuArrowRight />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default GiftsPage;
