"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hiictpark-backend.vercel.app/api';

const Hero = () => {
    const { language, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [heroData, setHeroData] = useState(null);
    const [courseCount, setCourseCount] = useState(5500);
    const [instructorCount, setInstructorCount] = useState(480);
    const [userCount, setUserCount] = useState(522891);

    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    // Fetch hero design from API
    useEffect(() => {
        const fetchHeroDesign = async () => {
            try {
                const res = await fetch(`${API_URL}/design/hero`);
                const data = await res.json();
                if (data.success && data.data?.heroContent) {
                    setHeroData(data.data.heroContent);
                }
            } catch (error) {
                console.error('Error fetching hero design:', error);
            }
        };
        fetchHeroDesign();
    }, [language]);

    // Fetch stats
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [courseRes, userRes] = await Promise.all([
                    fetch(`${API_URL}/courses`),
                    fetch(`${API_URL}/stats`)
                ]);
                const courseData = await courseRes.json();
                const userData = await userRes.json();

                if (courseData.meta?.total) {
                    setCourseCount(courseData.meta.total);
                }
                if (userData.data?.users) {
                    setUserCount(userData.data.users);
                }
                if (userData.data?.instructors) {
                    setInstructorCount(userData.data.instructors);
                }
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };
        fetchCounts();
    }, []);

    // Get content from heroData or use defaults
    const getCourseCount = () => {
        if (heroData?.stats?.courses) return heroData.stats.courses;
        return courseCount;
    };

    const getInstructorCount = () => {
        if (heroData?.stats?.instructors) return heroData.stats.instructors;
        return instructorCount;
    };

    const getBadgeText = () => {
        if (heroData?.badge?.text) {
            return language === 'bn' ? heroData.badge.textBn : heroData.badge.text;
        }
        return language === 'bn' ? t("hero.badge") : 'START TO SUCCESS';
    };

    const getDescriptionText = () => {
        if (heroData?.description?.text) {
            return language === 'bn' ? heroData.description.textBn : heroData.description.text;
        }
        return language === 'bn'
            ? t("hero.description")
            : 'Take your learning organisation to the next level.';
    };

    const getSearchPlaceholder = () => {
        if (heroData?.searchPlaceholder?.text) {
            return language === 'bn' ? heroData.searchPlaceholder.textBn : heroData.searchPlaceholder.text;
        }
        return language === 'bn' ? t("hero.searchPlaceholder") : 'What do you want to learn?';
    };

    return (
        <section className="relative min-h-[85vh] overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Soft Pink Gradient Circle - Top Right */}
                <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-gradient-to-br from-pink-100/60 via-pink-50/40 to-transparent dark:from-pink-900/10 dark:to-transparent rounded-full blur-3xl" />

                {/* Yellow decorative circle - Bottom Right */}
                <motion.div
                    className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-80"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Yellow ring - partially visible */}
                <div className="absolute bottom-16 right-4 w-20 h-20 border-4 border-amber-400/50 rounded-full" />

                {/* Small decorative elements */}
                <motion.div
                    className="absolute top-[20%] left-[15%] w-3 h-3 bg-red-400 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[30%] left-[25%] w-2 h-2 bg-pink-400 rounded-full"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                    className="absolute top-[15%] right-[40%] w-2 h-2 bg-red-500 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
            </div>

            <div className="container mx-auto px-4 lg:px-16 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className={`text-[#2196F3] font-bold text-sm tracking-[0.2em] uppercase ${bengaliClass}`}>
                                {getBadgeText()}
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <div className="mb-6">
                            <h1 className={`font-bold leading-[1.2] ${language === 'bn' ? 'hind-siliguri text-3xl md:text-4xl lg:text-[42px]' : 'text-3xl md:text-4xl lg:text-[46px]'}`}>
                                <span className="text-[#1a2e3a] dark:text-gray-200">
                                    {language === 'bn' ? t("hero.accessTo") : 'Access To '}
                                </span>
                                <span className="relative inline-block text-[#2196F3]">
                                    {getCourseCount()}+
                                    {/* Yellow underline */}
                                    <svg
                                        className="absolute -bottom-1 left-0 w-full h-3"
                                        viewBox="0 0 100 12"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0 8 Q25 2 50 8 T100 8"
                                            stroke="#FFC107"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <span className="text-[#1a2e3a] dark:text-gray-200">
                                    {language === 'bn' ? t("hero.coursesSuffix") : ' Courses'}
                                </span>
                                <br />
                                <span className="text-[#1a2e3a] dark:text-gray-200">
                                    {language === 'bn' ? t("hero.from") : 'from '}
                                </span>
                                <span className="relative inline-block text-[#2196F3]">
                                    {getInstructorCount()}
                                    {/* Yellow underline */}
                                    <svg
                                        className="absolute -bottom-1 left-0 w-full h-3"
                                        viewBox="0 0 100 12"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0 8 Q25 2 50 8 T100 8"
                                            stroke="#FFC107"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <span className="text-[#1a2e3a] dark:text-gray-200">
                                    {language === 'bn' ? t("hero.instructorsSuffix") : ' Instructors &'}
                                </span>
                                <br />
                                <span className="text-[#1a2e3a] dark:text-gray-200">
                                    {language === 'bn' ? t("hero.institutions") : 'Institutions'}
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className={`text-gray-500 dark:text-gray-400 text-base lg:text-lg mb-10 max-w-md ${bengaliClass}`}
                        >
                            {getDescriptionText()}
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="max-w-lg"
                        >
                            <Link
                                href={`/courses${searchQuery ? `?search=${searchQuery}` : ''}`}
                                className="block"
                            >
                                <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setSearchQuery(e.target.value);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder={getSearchPlaceholder()}
                                        className={`w-full px-6 py-4 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none text-base ${bengaliClass}`}
                                    />
                                    <div className="pr-5 text-[#2196F3]">
                                        <LuSearch className="w-6 h-6" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - 3D Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Hanging Lamps - Top Center */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-12 z-20">
                            <motion.div
                                className="flex flex-col items-center"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-[2px] h-14 bg-gray-300 dark:bg-gray-600" />
                                <div className="w-8 h-6 bg-gradient-to-b from-[#E62D26] to-red-600 rounded-b-full shadow-lg shadow-red-500/30" />
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <div className="w-[2px] h-20 bg-gray-300 dark:bg-gray-600" />
                                <div className="w-6 h-5 bg-gradient-to-b from-pink-400 to-pink-500 rounded-b-full shadow-lg shadow-pink-500/30" />
                            </motion.div>
                        </div>

                        {/* Floating Shapes - Around Lottie */}
                        <motion.div
                            className="absolute top-[20%] left-[5%] w-5 h-5 bg-[#E62D26] rounded-full z-30"
                            animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute top-[40%] left-[2%] w-3 h-3 bg-amber-400 rounded-full z-30"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        />
                        <motion.div
                            className="absolute top-[12%] right-[8%] w-4 h-4 bg-amber-500 rounded-full z-30"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute top-[55%] right-[3%] w-4 h-4 border-2 border-[#E62D26] rounded-full z-30"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-[25%] right-[6%] w-3 h-3 bg-pink-400 rounded-full z-30"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                        />

                        {/* Main Illustration - Lottie Animation (BIGGER) */}
                        <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl">
                            <DotLottieReact
                                src="https://lottie.host/5d2337e1-5416-4301-8c92-413589acb46d/rceP6tR6sX.lottie"
                                loop
                                autoplay
                                className="w-full h-auto scale-110 lg:scale-125"
                            />

                            {/* Chat Bubble - Top Right */}
                            <motion.div
                                className="absolute top-[8%] right-[10%] bg-white dark:bg-gray-800 rounded-2xl px-4 py-2.5 shadow-xl border border-gray-100 dark:border-gray-700 z-20"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <div className="flex gap-1.5 items-center">
                                    <span className="text-lg">👋</span>
                                    <span className="text-gray-400 text-sm">Hello!</span>
                                </div>
                            </motion.div>

                            {/* Emoji Bubble - Right Side */}
                            <motion.div
                                className="absolute top-[35%] right-[5%] bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 shadow-xl border border-gray-100 dark:border-gray-700 z-20"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                <div className="flex items-center gap-1">
                                    <span className="text-lg">🎓</span>
                                    <span className="text-lg">✨</span>
                                </div>
                            </motion.div>

                            {/* Stats Badge - Bottom Right */}
                            <motion.div
                                className="absolute bottom-[12%] right-[8%] bg-white dark:bg-gray-800 rounded-2xl px-4 py-2.5 shadow-xl border border-gray-100 dark:border-gray-700 z-20"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                        <span className="text-green-500 text-sm">✓</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400">Active Users</p>
                                        <p className="font-bold text-sm text-gray-800 dark:text-white">50K+</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Book Icon - Bottom Left */}
                            <motion.div
                                className="absolute bottom-[18%] left-[8%] bg-white dark:bg-gray-800 rounded-xl p-2.5 shadow-xl z-20"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.8, duration: 0.5 }}
                            >
                                <span className="text-xl">📚</span>
                            </motion.div>

                            {/* Decorative Plant - Bottom Left Corner */}
                            <motion.div
                                className="absolute bottom-[2%] left-[3%] z-10"
                                animate={{ rotate: [-2, 2, -2] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg className="w-16 h-20" viewBox="0 0 60 80" fill="none">
                                    <ellipse cx="30" cy="75" rx="12" ry="4" fill="#e5e7eb" />
                                    <path d="M30 70 Q25 50 15 40 Q10 35 5 40" stroke="#22c55e" strokeWidth="2.5" fill="none" />
                                    <path d="M30 70 Q35 45 45 35 Q50 30 55 35" stroke="#22c55e" strokeWidth="2.5" fill="none" />
                                    <path d="M30 70 Q30 45 25 30 Q23 20 30 15" stroke="#16a34a" strokeWidth="2.5" fill="none" />
                                    <circle cx="15" cy="38" r="6" fill="#22c55e" opacity="0.5" />
                                    <circle cx="45" cy="33" r="6" fill="#22c55e" opacity="0.5" />
                                    <circle cx="28" cy="18" r="5" fill="#16a34a" opacity="0.6" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes draw {
                    from {
                        stroke-dasharray: 200;
                        stroke-dashoffset: 200;
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                .animate-draw {
                    animation: draw 1s ease-out forwards;
                    animation-delay: 0.5s;
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                }
            `}</style>
        </section>
    );
};

export default Hero;
