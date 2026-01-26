"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesData } from "@/redux/CourseSlice";
import { fetchCategories } from "@/redux/categorySlice";
import LeftCategory from "@/components/coursepage/LeftCategory";
import dynamic from "next/dynamic";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi2";
import { LuBookOpen, LuFilter, LuUsers, LuPlay, LuTrendingUp, LuX } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const RightCoursesDetalis = dynamic(
  () => import("@/components/coursepage/RightCoursesDetalis"),
  { ssr: false }
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-[#E62D26] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Floating Element Component
const FloatingElement = ({ children, delay = 0, duration = 3, className = "" }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const CourseContent = () => {
  const dispatch = useDispatch();
  const { courses = [], loading } = useSelector((state) => state.courses || {});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    dispatch(fetchCoursesData());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:to-[#0a0a0a] transition-colors duration-300">
      {/* Hero Header - Enhanced */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E62D26]/5 via-transparent to-[#F79952]/5"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(230,45,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,45,38,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#E62D26]/20 to-[#E62D26]/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#F79952]/20 to-[#F79952]/5 rounded-full blur-3xl"
        />

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Books */}
          <FloatingElement delay={0} className="absolute top-20 left-[10%] hidden lg:block">
            <div className="w-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border border-white/50">
              <span className="text-2xl">📚</span>
            </div>
          </FloatingElement>
          
          {/* Floating Certificate */}
          <FloatingElement delay={1} duration={4} className="absolute top-32 right-[12%] hidden lg:block">
            <div className="w-14 h-14 bg-gradient-to-br from-[#F79952] to-[#E62D26] rounded-2xl shadow-lg flex items-center justify-center rotate-12">
              <span className="text-2xl">🎓</span>
            </div>
          </FloatingElement>

          {/* Floating Code */}
          <FloatingElement delay={0.5} duration={3.5} className="absolute bottom-24 left-[15%] hidden lg:block">
            <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
              <code className="text-xs text-emerald-400 font-mono">&lt;Learn/&gt;</code>
            </div>
          </FloatingElement>

          {/* Floating Star */}
          <FloatingElement delay={1.5} className="absolute bottom-32 right-[8%] hidden lg:block">
            <div className="w-10 h-10 bg-amber-400/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
              <span className="text-lg">⭐</span>
            </div>
          </FloatingElement>

          {/* Decorative Dots */}
          <div className="absolute top-1/2 left-8 w-2 h-2 bg-[#E62D26]/40 rounded-full hidden lg:block"></div>
          <div className="absolute top-1/3 left-12 w-1.5 h-1.5 bg-[#F79952]/40 rounded-full hidden lg:block"></div>
          <div className="absolute bottom-1/3 right-8 w-2 h-2 bg-[#E62D26]/40 rounded-full hidden lg:block"></div>
          <div className="absolute bottom-1/2 right-16 w-1.5 h-1.5 bg-[#F79952]/40 rounded-full hidden lg:block"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-16 py-8 lg:py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-[#E62D26]/20 dark:border-white/10 rounded-full shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E62D26] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E62D26]"></span>
              </span>
              <span className={`text-xs font-medium text-slate-700 dark:text-gray-300 ${bengaliClass}`}>
                {t("coursesPage.badge") || "Explore Premium Courses"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-slate-800 dark:text-white mb-3 leading-tight ${bengaliClass}`}
            >
              {t("coursesPage.title1") || "Discover Our "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62D26] to-[#F79952]">
                  {t("coursesPage.title2") || "Premium Courses"}
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C47.6667 2.16667 141 -1.8 199 5.5" stroke="#E62D26" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xl mx-auto ${bengaliClass}`}
            >
              {t("coursesPage.subtitle") || "Learn from industry experts and transform your career with our comprehensive course catalog"}
            </motion.p>

            {/* Stats Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 lg:gap-6"
            >
              {/* Courses Stat */}
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E62D26]/30 transition-all duration-300">
                <div className="w-9 h-9 bg-gradient-to-br from-[#E62D26]/10 to-[#E62D26]/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LuBookOpen className="text-[#E62D26] text-base" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800 dark:text-white outfit">{courses.length || '20'}+</p>
                  <p className={`text-[10px] text-slate-500 dark:text-gray-400 ${bengaliClass}`}>{t("coursesPage.courses") || "Courses"}</p>
                </div>
              </div>

              {/* Categories Stat */}
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#F79952]/30 transition-all duration-300">
                <div className="w-9 h-9 bg-gradient-to-br from-[#F79952]/10 to-[#F79952]/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HiOutlineSparkles className="text-[#F79952] text-base" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800 dark:text-white outfit">10+</p>
                  <p className={`text-[10px] text-slate-500 dark:text-gray-400 ${bengaliClass}`}>{t("coursesPage.categories") || "Categories"}</p>
                </div>
              </div>

              {/* Students Stat */}
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LuUsers className="text-emerald-500 text-base" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800 dark:text-white outfit">5K+</p>
                  <p className={`text-[10px] text-slate-500 dark:text-gray-400 ${bengaliClass}`}>Students</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 33.3C840 36.7 960 43.3 1080 45C1200 46.7 1320 43.3 1380 41.7L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="currentColor" className="text-slate-50 dark:text-[#0a0a0a]"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-16 py-6 lg:py-10">
        {/* Mobile Filter Toggle */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className={`lg:hidden flex items-center gap-2 mb-5 px-5 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm w-full justify-center hover:border-[#E62D26]/50 transition-colors ${bengaliClass}`}
        >
          <LuFilter className="text-[#E62D26]" />
          <span className="font-medium text-slate-700 dark:text-white">{t("coursesPage.filtersCategories") || "Filters & Categories"}</span>
          {showMobileFilter && <LuX className="ml-auto text-slate-400" />}
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Filters */}
          <AnimatePresence>
            {(showMobileFilter || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`lg:w-[300px] shrink-0 ${showMobileFilter ? 'block' : 'hidden lg:block'}`}
              >
                <div className="lg:sticky lg:top-24">
                  <Suspense fallback={<LoadingFallback />}>
                    <LeftCategory
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                    />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right - Course Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <Suspense fallback={<LoadingFallback />}>
              <RightCoursesDetalis
                searchQuery={searchQuery}
                selectedType={selectedType}
              />
            </Suspense>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const Course = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CourseContent />
    </Suspense>
  );
};

export default Course;
