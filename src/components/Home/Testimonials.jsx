"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const Testimonials = () => {
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";
    const [currentPage, setCurrentPage] = useState(0);

    const testimonials = [
        {
            id: 1,
            title: language === 'bn' ? 'দারুণ কোয়ালিটি!' : 'Great quality!',
            titleColor: 'text-orange-500',
            review: language === 'bn'
                ? 'আমি একটি রিভিউ দিতে চেয়েছিলাম কারণ তাদের সাপোর্ট আমাকে এক দিনের মধ্যে সাহায্য করেছে, যা দারুণ! ধন্যবাদ এবং ৫ স্টার!'
                : 'I wanted to place a review since their support helped me within a day or so, which is nice! Thanks and 5 stars!',
            name: 'Oliver Beddows',
            designation: language === 'bn' ? 'ডিজাইনার, ম্যানচেস্টার' : 'Designer, Manchester',
            avatar: 'https://i.pravatar.cc/100?img=11',
        },
        {
            id: 2,
            title: language === 'bn' ? 'কোড কোয়ালিটি' : 'Code Quality',
            titleColor: 'text-blue-600',
            review: language === 'bn'
                ? 'ThemeMove-এর ফিচার, ডিজাইন কোয়ালিটি, ফ্লেক্সিবিলিটি এবং সাপোর্ট সার্ভিসের জন্য ৫ স্টার প্রাপ্য!'
                : "ThemeMove deserves 5 star for theme's features, design quality, flexibility, and support service!",
            name: 'Madley Pondor',
            designation: language === 'bn' ? 'রিপোর্টার, সান ডিয়েগো' : 'Reporter, San Diego',
            avatar: 'https://i.pravatar.cc/100?img=12',
        },
        {
            id: 3,
            title: language === 'bn' ? 'কাস্টমার সাপোর্ট' : 'Customer Support',
            titleColor: 'text-blue-600',
            review: language === 'bn'
                ? 'সপ্তাহে খুব ভালো এবং দ্রুত সাপোর্ট পাওয়া যায়। তারা জানে আপনার ঠিক কী প্রয়োজন।'
                : 'Very good and fast support during the week. They know what you need, exactly when you need it.',
            name: 'Mina Hollace',
            designation: language === 'bn' ? 'রিপোর্টার, লন্ডন' : 'Reporter, London',
            avatar: 'https://i.pravatar.cc/100?img=13',
        },
        {
            id: 4,
            title: language === 'bn' ? 'অসাধারণ অভিজ্ঞতা!' : 'Amazing Experience!',
            titleColor: 'text-orange-500',
            review: language === 'bn'
                ? 'কোর্সগুলো খুবই সুন্দরভাবে তৈরি। প্রতিটি লেসন সহজে বোধগম্য এবং প্র্যাক্টিক্যাল।'
                : 'The courses are beautifully crafted. Every lesson is easy to understand and practical.',
            name: 'James Wilson',
            designation: language === 'bn' ? 'ডেভেলপার, নিউ ইয়র্ক' : 'Developer, New York',
            avatar: 'https://i.pravatar.cc/100?img=14',
        },
        {
            id: 5,
            title: language === 'bn' ? 'সেরা প্ল্যাটফর্ম' : 'Best Platform',
            titleColor: 'text-blue-600',
            review: language === 'bn'
                ? 'অনলাইন লার্নিং এর জন্য সেরা প্ল্যাটফর্ম। সব কোর্স আপডেটেড এবং প্রফেশনাল।'
                : 'Best platform for online learning. All courses are updated and professional.',
            name: 'Sophie Chen',
            designation: language === 'bn' ? 'স্টুডেন্ট, সিঙ্গাপুর' : 'Student, Singapore',
            avatar: 'https://i.pravatar.cc/100?img=15',
        },
        {
            id: 6,
            title: language === 'bn' ? 'দ্রুত সার্টিফিকেট' : 'Quick Certificate',
            titleColor: 'text-orange-500',
            review: language === 'bn'
                ? 'কোর্স শেষ করার পরপরই সার্টিফিকেট পেয়ে গেছি। এটা আমার ক্যারিয়ারে অনেক কাজে এসেছে।'
                : 'Got certificate right after completing the course. It helped a lot in my career.',
            name: 'Ahmed Hassan',
            designation: language === 'bn' ? 'ফ্রিল্যান্সার, দুবাই' : 'Freelancer, Dubai',
            avatar: 'https://i.pravatar.cc/100?img=16',
        },
    ];

    const itemsPerPage = 3;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);
    const currentTestimonials = testimonials.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <section className="py-16 lg:py-20 bg-white dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-4 lg:px-16">
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Left Side - Title and Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <h2 className={`text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 ${bengaliClass}`}>
                            {language === 'bn' ? 'মানুষ যা বলে' : 'People Say'}
                            <br />
                            <span className="relative inline-block">
                                {language === 'bn' ? 'HiictPark সম্পর্কে' : 'About HiictPark'}
                                <span className="absolute -bottom-1 left-0 w-20 h-1 bg-amber-400 rounded-full"></span>
                            </span>
                        </h2>

                        <p className={`text-gray-500 dark:text-gray-400 text-sm lg:text-base mb-6 ${bengaliClass}`}>
                            {language === 'bn'
                                ? 'যেকোনো eLearning সেন্টার, অনলাইন কোর্সের জন্য ওয়ান-স্টপ সলিউশন। মানুষ HiictPark পছন্দ করে কারণ তারা সহজেই এখানে শিখতে পারে।'
                                : 'One-stop solution for any eLearning center, online courses. People love HiictPark because they can create their sites with ease here.'
                            }
                        </p>

                        <Link
                            href="/reviews"
                            className={`inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ${bengaliClass}`}
                        >
                            {language === 'bn' ? 'সব দেখুন' : 'View all'}
                        </Link>
                    </motion.div>

                    {/* Right Side - Testimonial Cards */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-3 gap-6">
                            {currentTestimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 relative"
                                >
                                    {/* Quote Icon */}
                                    <div className="absolute top-6 right-6">
                                        <svg
                                            className="w-8 h-8 text-orange-400 opacity-50"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`font-bold text-lg mb-3 ${testimonial.titleColor} ${bengaliClass}`}>
                                        {testimonial.title}
                                    </h3>

                                    {/* Review */}
                                    <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 ${bengaliClass}`}>
                                        {testimonial.review}
                                    </p>

                                    {/* User Info */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className={`font-semibold text-gray-900 dark:text-white text-sm ${bengaliClass}`}>
                                                {testimonial.name}
                                            </p>
                                            <p className={`text-gray-500 dark:text-gray-400 text-xs ${bengaliClass}`}>
                                                / {testimonial.designation}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentPage === index
                                                ? 'bg-gray-900 dark:bg-white w-6'
                                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
