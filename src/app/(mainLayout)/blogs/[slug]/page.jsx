'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiArrowLeft,
    FiClock,
    FiUser,
    FiCalendar,
    FiHeart,
    FiMessageCircle,
    FiShare2,
    FiBookOpen,
    FiTag,
    FiEye,
    FiSend,
    FiArrowRight,
    FiPlay,
} from 'react-icons/fi';
import { API_BASE_URL } from '@/config/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useLanguage } from '@/context/LanguageContext';
import { DEMO_BLOGS } from '@/config/demoData';

export default function SingleBlogPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;
    const user = useSelector(state => state.auth?.user);
    const { language, t: translate } = useLanguage();

    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [readProgress, setReadProgress] = useState(0);

    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    // Reading progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setReadProgress(Math.min(100, Math.max(0, progress)));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch blog data
    useEffect(() => {
        const fetchBlog = async () => {
            if (!slug) return;

            setLoading(true);
            try {
                // First check if it's a demo blog
                const demoBlog = DEMO_BLOGS.find(b => b.slug === slug);
                if (demoBlog) {
                    setBlog(demoBlog);
                    setRelatedBlogs(DEMO_BLOGS.filter(b => b.slug !== slug).slice(0, 3));
                    setLoading(false);
                    return;
                }

                const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, { headers });
                const data = await res.json();

                if (data.success && data.data) {
                    setBlog(data.data);
                    setRelatedBlogs(data.data.relatedBlogs || []);
                    setIsLiked(data.data.isLiked || false);
                    setLikeCount(data.data.likeCount || 0);

                    const commentsRes = await fetch(`${API_BASE_URL}/blogs/${data.data._id}/comments`);
                    const commentsData = await commentsRes.json();
                    if (commentsData.success) setComments(commentsData.data || []);
                } else {
                    router.push('/blogs');
                }
            } catch (error) {
                console.error('Failed to fetch blog:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug, router]);

    const handleLike = async () => {
        if (!user) { toast.error(language === 'bn' ? 'লগইন করুন' : 'Please login'); return; }
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API_BASE_URL}/blogs/${blog._id}/toggle-like`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setIsLiked(data.data.isLiked);
                setLikeCount(data.data.likeCount);
            }
        } catch (error) {
            toast.error('Failed to like');
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!user) { toast.error(language === 'bn' ? 'লগইন করুন' : 'Please login'); return; }
        if (!commentText.trim()) return;

        setSubmittingComment(true);
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API_BASE_URL}/blogs/${blog._id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ content: commentText }),
            });
            const data = await res.json();
            if (data.success) {
                setComments([data.data, ...comments]);
                setCommentText('');
                toast.success(language === 'bn' ? 'মন্তব্য যোগ হয়েছে!' : 'Comment added!');
            }
        } catch (error) {
            toast.error('Failed to add comment');
        } finally {
            setSubmittingComment(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-maroon flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
                />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-maroon flex items-center justify-center">
                <div className="text-center">
                    <FiBookOpen className="text-primary mx-auto mb-6" size={64} />
                    <h2 className="text-2xl font-black text-white mb-2">{translate('blog.noArticles')}</h2>
                    <Link href="/blogs" className="text-primary font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">{translate('blog.backToInsights')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-maroon selection:bg-primary selection:text-maroon font-poppins antialiased overflow-x-hidden">

            {/* Reading Progress Indicator */}
            <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] pointer-events-none">
                <motion.div
                    style={{ scaleX: readProgress / 100 }}
                    className="h-full bg-primary origin-left shadow-[0_0_15px_rgba(230,45,38,0.8)]"
                />
            </div>

            {/* Premium Blog Header */}
            <header className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Image with Parallax & Gradients */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover opacity-20 scale-110 blur-sm"
                        priority
                    />
                    <div className="absolute inset-0 bg-maroon via-maroon/90 to-transparent" />
                </div>

                <div className="container mx-auto px-4 lg:px-20 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-maroon hover:border-primary transition-all duration-300"
                        >
                            <FiArrowLeft size={14} /> {translate('blog.backToInsights')}
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1.5 rounded-md bg-primary text-maroon text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
                                    {blog.category?.name || 'INSIGHTS'}
                                </span>
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <FiCalendar className="text-primary" /> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                                </span>
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <FiClock className="text-primary" /> {blog.readingTime || '5'} {translate('blog.minRead')}
                                </span>
                            </div>

                            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight ${bengaliClass}`}>
                                {blog.title}
                            </h1>

                            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                <div className="w-12 h-12 rounded-full border border-primary/20 p-1">
                                    <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-black">
                                        {blog.author?.firstName?.[0] || 'A'}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-black uppercase tracking-widest">{blog.author?.firstName} {blog.author?.lastName}</p>
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{translate('blog.officialContributor')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Blog Body Section */}
            <main className="pb-32">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Interaction Sidebar - Sticky */}
                        <aside className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-40 flex flex-col items-center gap-8">
                                <button
                                    onClick={handleLike}
                                    className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${isLiked ? 'bg-primary border-primary text-maroon shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-white/50 hover:border-primary hover:text-primary'}`}
                                >
                                    <FiHeart size={20} className={isLiked ? 'fill-current' : ''} />
                                </button>
                                <span className="text-white/30 text-[10px] font-black">{likeCount}</span>

                                <div className="w-1 h-12 bg-white/5 rounded-full" />

                                <Link href="#comments" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300">
                                    <FiMessageCircle size={20} />
                                </Link>
                                <span className="text-white/30 text-[10px] font-black">{comments.length}</span>

                                <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300">
                                    <FiShare2 size={20} />
                                </button>
                            </div>
                        </aside>

                        {/* Main Content Article */}
                        <article className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-14 shadow-2xl relative"
                            >
                                {/* Excerpt / Summary Box */}
                                <div className="bg-primary/5 p-8 rounded-3xl border-l-[6px] border-primary mb-12">
                                    <p className={`text-white/80 text-lg md:text-xl font-normal leading-relaxed italic ${bengaliClass}`}>
                                        &quot;{blog.excerpt}&quot;
                                    </p>
                                </div>

                                {/* Content Body */}
                                <div
                                    className={`prose prose-invert prose-lg max-w-none 
                                    prose-p:text-white/60 prose-p:leading-relaxed prose-p:font-normal
                                    prose-headings:text-white prose-headings:font-black
                                    prose-strong:text-primary
                                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                    prose-img:rounded-3xl prose-img:border prose-img:border-white/10
                                    prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:rounded-r-2xl prose-blockquote:p-6
                                    ${bengaliClass}`}
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />

                                {/* Tags */}
                                {blog.tags?.length > 0 && (
                                    <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap gap-3">
                                        <FiTag className="text-primary mr-2" />
                                        {blog.tags.map((tag, idx) => (
                                            <span key={idx} className="px-4 py-2 rounded-xl bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest border border-white/5 hover:border-primary/20 hover:text-primary transition-all cursor-default">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Author Card */}
                            <div className="mt-12 bg-card rounded-[2rem] p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8 group">
                                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-orange-500 p-1 group-hover:rotate-12 transition-transform duration-500">
                                    <div className="w-full h-full rounded-[1.8rem] bg-card-dark flex items-center justify-center text-white text-3xl font-black">
                                        {blog.author?.firstName?.[0]}
                                    </div>
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h4 className="text-xl font-black text-white mb-2">{blog.author?.firstName} {blog.author?.lastName}</h4>
                                    <p className="text-white/40 text-sm mb-4 leading-relaxed">{translate('blog.authorDesc')}</p>
                                    <div className="flex justify-center md:justify-start gap-4">
                                        <Link href="/blogs" className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            {translate('blog.followInsights')} <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div id="comments" className="mt-24">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-8 bg-primary rounded-full" />
                                        <h3 className="text-2xl font-black text-white uppercase tracking-widest">{translate('blog.comments')}</h3>
                                    </div>
                                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black">
                                        {comments.length} {translate('blog.total')}
                                    </span>
                                </div>

                                {blog.allowComments && (
                                    <form onSubmit={handleSubmitComment} className="mb-16 bg-white/5 p-8 rounded-[2rem] border border-white/10">
                                        <textarea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder={user ? translate('blog.writeComment') : translate('blog.loginToComment')}
                                            disabled={!user}
                                            className="w-full bg-maroon border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-primary transition-colors text-base font-normal min-h-[150px] mb-6"
                                        />
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={!user || !commentText.trim() || submittingComment}
                                                className="px-10 py-4 bg-primary text-maroon rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all shadow-2xl disabled:opacity-30"
                                            >
                                                {submittingComment ? translate('blog.posting') : translate('blog.submit')}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="space-y-6">
                                    {comments.map((comment, idx) => (
                                        <motion.div
                                            key={comment._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white/5 p-8 rounded-[2rem] border border-white/5"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                                                    {comment.user?.firstName?.[0] || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-black uppercase tracking-widest">{comment.user?.firstName}</p>
                                                    <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-white/60 leading-relaxed font-normal">{comment.content}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* Relative / Sidebar Content */}
                        <aside className="lg:col-span-4 lg:pl-8">
                            <div className="sticky top-40 space-y-12">

                                {/* Related Posts Widget */}
                                {relatedBlogs.length > 0 && (
                                    <div className="bg-card rounded-[2.5rem] p-8 border border-white/5">
                                        <h3 className="text-lg font-black text-white mb-8 border-b border-white/5 pb-4 uppercase tracking-[0.2em]">
                                            {translate('blog.curatedForYou')}
                                        </h3>
                                        <div className="flex flex-col gap-8">
                                            {relatedBlogs.slice(0, 3).map((item) => (
                                                <Link key={item._id} href={`/blogs/${item.slug}`} className="group flex flex-col gap-4">
                                                    <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10">
                                                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        <div className="absolute inset-0 bg-maroon/40 group-hover:bg-transparent transition-colors" />
                                                    </div>
                                                    <div>
                                                        <span className="text-primary text-[9px] font-black uppercase tracking-widest mb-1 block">
                                                            {item.category?.name || 'TECHNOLOGY'}
                                                        </span>
                                                        <h4 className={`text-white font-bold group-hover:text-primary transition-colors line-clamp-2 ${bengaliClass}`}>
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Premium CTA Widget */}
                                <div className="bg-gradient-to-br from-primary to-orange-600 rounded-[2.5rem] p-10 relative overflow-hidden group">
                                    <FiSparkles className="absolute -top-4 -right-4 text-white/20 w-32 h-32 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                                    <div className="relative z-10 text-center">
                                        <h3 className="text-2xl font-black text-maroon mb-4">{translate('blog.wantMore')}</h3>
                                        <p className="text-maroon/70 text-sm mb-8 font-bold leading-relaxed">{translate('blog.innerCircle')}</p>
                                        <Link href="/contact" className="inline-block w-full py-4 bg-maroon text-primary rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-maroon transition-all shadow-2xl">
                                            {translate('blog.letsConnect')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Simple Helper for the icon
const FiSparkles = ({ className }) => (
    <svg
        className={className}
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
        <path d="M5 3l1 1" /><path d="M19 3l-1 1" /><path d="M19 19l-1-1" /><path d="M5 19l1-1" />
    </svg>
);

