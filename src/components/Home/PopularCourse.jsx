"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://motionboss-backend.vercel.app/api';

// Course Card Component matching reference design
const CourseCard = ({ course }) => {
  const { language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const hasDiscount = course.discountPrice && course.discountPrice < course.price;
  const discountPercent = hasDiscount
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0;
  const isFree = course.price === 0 || course.isFree;
  const isFeatured = course.isFeatured;

  // Level badge colors
  const getLevelStyle = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return { bg: 'bg-green-100', text: 'text-green-600', label: language === 'bn' ? 'বিগিনার' : 'Beginner' };
      case 'intermediate':
        return { bg: 'bg-blue-100', text: 'text-blue-600', label: language === 'bn' ? 'ইন্টারমিডিয়েট' : 'Intermediate' };
      case 'advanced':
      case 'expert':
        return { bg: 'bg-red-100', text: 'text-red-600', label: language === 'bn' ? 'এক্সপার্ট' : 'Expert' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', label: level || 'All Levels' };
    }
  };

  const levelStyle = getLevelStyle(course.level);

  return (
    <Link href={`/courses/${course.slug || course._id}`} className="block group">
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={course.thumbnail || '/images/course-placeholder.jpg'}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isFeatured && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase">
                Featured
              </span>
            )}
            {hasDiscount && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded">
                -{discountPercent}%
              </span>
            )}
            {isFree && (
              <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">
                Free
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Level Badge */}
          <span className={`inline-block px-3 py-1 ${levelStyle.bg} ${levelStyle.text} text-xs font-semibold rounded mb-3 ${bengaliClass}`}>
            {levelStyle.label}
          </span>

          {/* Title */}
          <h3 className={`font-semibold text-gray-800 dark:text-white text-base leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors ${bengaliClass}`}>
            {course.title}
          </h3>

          {/* Instructor */}
          <p className={`text-sm text-gray-500 dark:text-gray-400 mb-3 ${bengaliClass}`}>
            {course.instructor?.name || course.instructorName || 'Instructor'}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            {isFree ? (
              <span className={`text-lg font-bold text-green-600 ${bengaliClass}`}>
                {language === 'bn' ? 'ফ্রি' : 'Free'}
              </span>
            ) : (
              <>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${hasDiscount ? course.discountPrice : course.price}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    ${course.price}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Loading Skeleton
const CourseCardSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-20" />
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
      </div>
    </div>
  </div>
);

const PopularCourse = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [startIndex, setStartIndex] = useState(0);
  const { language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const { items: categories = [] } = useSelector((state) => state.categories);
  const { courses = [], loading } = useSelector((state) => state.courses);

  const visibleItems = 5;

  const filters = [
    { id: 'all', label: language === 'bn' ? 'সব' : 'All' },
    { id: 'trending', label: language === 'bn' ? 'ট্রেন্ডিং' : 'Trending' },
    { id: 'popularity', label: language === 'bn' ? 'জনপ্রিয়' : 'Popularity' },
    { id: 'featured', label: language === 'bn' ? 'ফিচার্ড' : 'Featured' },
    ...(categories.slice(0, 2).map(cat => ({
      id: cat._id,
      label: language === 'bn' ? cat.nameBn || cat.name : cat.name
    })))
  ];

  // Filter courses based on active filter
  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'all':
        return courses;
      case 'trending':
        return courses.filter(c => c.totalEnrollments > 10);
      case 'popularity':
        return [...courses].sort((a, b) => (b.totalEnrollments || 0) - (a.totalEnrollments || 0));
      case 'featured':
        return courses.filter(c => c.isFeatured);
      default:
        return courses.filter(c => {
          const catId = c.category?._id || c.category;
          return catId === activeFilter;
        });
    }
  };

  const filteredCourses = getFilteredCourses();
  const visibleCourses = filteredCourses.slice(startIndex, startIndex + visibleItems);

  const handlePrev = () => {
    setStartIndex(prev => prev > 0 ? prev - 1 : Math.max(filteredCourses.length - visibleItems, 0));
  };

  const handleNext = () => {
    setStartIndex(prev => prev + visibleItems < filteredCourses.length ? prev + 1 : 0);
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setStartIndex(0);
  };

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white ${bengaliClass}`}>
              {language === 'bn' ? 'শিক্ষার্থীরা দেখছেন' : 'Students are '}
              <span className="relative inline-block">
                {language === 'bn' ? '' : 'Viewing'}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-400 rounded-full"></span>
              </span>
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1 flex-wrap"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${bengaliClass} ${activeFilter === filter.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Courses Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {filteredCourses.length > visibleItems && (
            <>
              <button
                onClick={handlePrev}
                className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <LuChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <LuChevronRight size={20} />
              </button>
            </>
          )}

          {/* Course Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {[1, 2, 3, 4, 5].map(i => <CourseCardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
            >
              {visibleCourses.length > 0 ? (
                visibleCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className={`text-gray-500 ${bengaliClass}`}>
                    {language === 'bn' ? 'কোন কোর্স পাওয়া যায়নি' : 'No courses found'}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCourse;
