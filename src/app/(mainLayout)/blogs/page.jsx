'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    FiClock,
    FiTrendingUp,
    FiBookOpen,
    FiArrowRight,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiSearch,
    FiTag
} from 'react-icons/fi';
import { API_BASE_URL } from '@/config/api';
import { useLanguage } from '@/context/LanguageContext';
import { DEMO_BLOGS } from '@/config/demoData';

export default function BlogPage() {
    const { language, t: translate } = useLanguage();
    const [blogs, setBlogs] = useState(DEMO_BLOGS);
    const [featuredBlogs, setFeaturedBlogs] = useState(DEMO_BLOGS.slice(0, 3));
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                let url = `${API_BASE_URL}/blogs?status=published&page=${currentPage}&limit=9`;
                if (searchTerm) url += `&search=${searchTerm}`;

                const res = await fetch(url);
                const data = await res.json();
                if (data.success) {
                    // Combine with Demo Blogs if on page 1 and no search
                    if (currentPage === 1 && !searchTerm) {
                        setBlogs([...DEMO_BLOGS, ...(data.data || [])]);
                    } else {
                        setBlogs(data.data || []);
                    }
                    setTotalPages(data.meta?.totalPages || 1);
                } else if (currentPage === 1 && !searchTerm) {
                    setBlogs(DEMO_BLOGS);
                }

                // Fetch featured for the hero
                const featuredRes = await fetch(`${API_BASE_URL}/blogs/featured?limit=3`);
                const featuredData = await featuredRes.json();
                if (featuredData.success && featuredData.data?.length > 0) {
                    setFeaturedBlogs(featuredData.data);
                } else if (currentPage === 1 && !searchTerm) {
                    setFeaturedBlogs(DEMO_BLOGS.slice(0, 3));
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                if (currentPage === 1 && !searchTerm) {
                    setBlogs(DEMO_BLOGS);
                    setFeaturedBlogs(DEMO_BLOGS.slice(0, 3));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [currentPage, searchTerm]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading && blogs.length === 0) {
        return (
            <div className="min-h-screen bg-maroon flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-maroon selection:bg-primary selection:text-maroon font-poppins antialiased overflow-x-hidden">

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Premium Blog Hero */}
            <section className="relative pt-20 pb-12">
                <div className="container mx-auto px-4 lg:px-20 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <FiBookOpen className="text-primary" size={16} />
                            <span className={`text-[10px] font-black text-white/80 uppercase tracking-[0.2em] ${bengaliClass}`}>
                                {translate('blog.badge')}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight ${bengaliClass}`}
                        >
                            {translate('blog.title1')}{' '}
                            <span className="text-primary italic">{translate('blog.title2')}</span>{' '}
                            {translate('blog.title3')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8 font-normal ${bengaliClass}`}
                        >
                            {translate('blog.desc')}
                        </motion.p>

                        {/* Search Bar - Premium Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-xl mx-auto group"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center p-2">
                                <FiSearch className="ml-5 text-white/30" size={20} />
                                <input
                                    type="text"
                                    placeholder={translate('blog.searchPlaceholder')}
                                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 text-sm px-4 py-3"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="px-6 py-3 bg-primary text-maroon rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-lg">
                                    {translate('blog.searchBtn')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Post Grid - If exists */}
            {featuredBlogs.length > 0 && currentPage === 1 && !searchTerm && (
                <section className="pb-24">
                    <div className="container mx-auto px-4 lg:px-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[500px]">
                            {/* Main Featured */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative rounded-3xl overflow-hidden group border border-white/5"
                            >
                                <Link href={`/blogs/${featuredBlogs[0].slug}`} className="block h-full">
                                    <Image
                                        src={featuredBlogs[0].thumbnail}
                                        alt={featuredBlogs[0].title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/40 to-transparent" />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-md bg-primary text-maroon text-[9px] font-black uppercase tracking-widest shadow-lg">
                                                {featuredBlogs[0].category?.name || 'FEATURED'}
                                            </span>
                                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                                <FiClock /> 5 {translate('blog.minRead')}
                                            </span>
                                        </div>
                                        <h2 className={`text-2xl md:text-3xl font-black text-white mb-4 line-clamp-2 ${bengaliClass}`}>
                                            {featuredBlogs[0].title}
                                        </h2>
                                        <p className="text-white/50 text-sm line-clamp-2 max-w-xl group-hover:text-white/80 transition-colors">
                                            {featuredBlogs[0].excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Secondary Featured List */}
                            <div className="flex flex-col gap-6">
                                {featuredBlogs.slice(1, 3).map((blog, idx) => (
                                    <motion.div
                                        key={blog._id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex-1 relative rounded-2xl overflow-hidden group border border-white/5"
                                    >
                                        <Link href={`/blogs/${blog.slug}`} className="block h-full">
                                            <Image
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-maroon/20" />
                                            <div className="absolute inset-0 p-6 flex flex-col justify-center">
                                                <span className="inline-block w-fit px-2 py-1 rounded-md bg-white/10 text-primary text-[8px] font-black uppercase tracking-[0.2em] mb-3">
                                                    {blog.category?.name || 'ARTICLE'}
                                                </span>
                                                <h3 className={`text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors ${bengaliClass}`}>
                                                    {blog.title}
                                                </h3>
                                                <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <FiCalendar /> {formatDate(blog.publishedAt || blog.createdAt)}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* List Section */}
            <section className="pb-32">
                <div className="container mx-auto px-4 lg:px-20">
                    {/* Grid Title */}
                    <div className="flex items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(230,45,38,0.5)]" />
                            <h2 className={`text-2xl font-black text-white uppercase tracking-widest ${bengaliClass}`}>
                                {translate('blog.latestFeed')}
                            </h2>
                        </div>
                    </div>

                    {blogs.length === 0 ? (
                        <div className="text-center py-32 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                            <FiBookOpen className="text-white/10 mx-auto mb-6" size={64} />
                            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">{translate('blog.noArticles')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {blogs.map((blog, index) => (
                                <motion.div
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                    className="group"
                                >
                                    <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full bg-card rounded-md border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden relative">
                                        {/* Image Container */}
                                        <div className="relative h-60 overflow-hidden">
                                            <Image
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-maroon/20 group-hover:bg-transparent transition-colors duration-500" />

                                            {/* Category Tag */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1.5 rounded-md bg-maroon/80 backdrop-blur-md border border-white/10 text-primary text-[9px] font-black uppercase tracking-widest">
                                                    {blog.category?.name || 'UNCATEGORIZED'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Meta Box */}
                                        <div className="p-8 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-4 text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-6">
                                                    <span className="flex items-center gap-2">
                                                        <FiCalendar className="text-primary" /> {formatDate(blog.publishedAt || blog.createdAt)}
                                                    </span>
                                                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                                                    <span className="flex items-center gap-2">
                                                        <FiTrendingUp className="text-primary" /> {blog.views || 0}
                                                    </span>
                                                </div>
                                                <h3 className={`text-xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors ${bengaliClass}`}>
                                                    {blog.title}
                                                </h3>
                                                <p className="text-white/40 text-sm font-normal line-clamp-2 leading-relaxed mb-8">
                                                    {blog.excerpt}
                                                </p>
                                            </div>

                                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                                                    {translate('blog.readFullPost')} <FiArrowRight size={14} />
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-black">
                                                        {blog.author?.firstName?.[0] || 'A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Overlay Line */}
                                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Pagination - Premium Dots & Arrows */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 disabled:opacity-30 hover:bg-primary hover:text-maroon hover:border-primary transition-all shadow-xl"
                            >
                                <FiChevronLeft size={20} />
                            </button>

                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-3 h-3 rounded-full transition-all duration-500 ${currentPage === i + 1 ? 'w-10 bg-primary' : 'bg-white/10 hover:bg-white/20'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 disabled:opacity-30 hover:bg-primary hover:text-maroon hover:border-primary transition-all shadow-xl"
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Subscription (Premium Footer CTA) */}
            <section className="pb-32">
                <div className="container mx-auto px-4 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-[2.5rem] p-10 lg:p-20 relative overflow-hidden border border-white/5"
                    >
                        {/* Abstract Background */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h2 className={`text-3xl md:text-5xl font-black text-white mb-8 ${bengaliClass}`}>
                                {translate('blog.newsletterTitle1')}{' '}
                                <span className="text-primary italic">{translate('blog.newsletterTitle2')}</span>
                            </h2>
                            <p className="text-white/40 text-base md:text-lg mb-12 max-w-2xl mx-auto">
                                {translate('blog.newsletterDesc')}
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 bg-maroon border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-primary transition-colors text-sm font-bold"
                                />
                                <button className="px-12 py-5 bg-primary text-maroon rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-2xl">
                                    {translate('blog.subscribe')}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}


