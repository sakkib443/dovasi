'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FiPlay, FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiEye, FiClock, FiBook, FiFilter, FiMoreVertical,
    FiVideo, FiRefreshCw, FiChevronLeft, FiChevronRight,
    FiLayers, FiTrendingUp, FiCheckCircle, FiMonitor
} from 'react-icons/fi';
import { API_BASE_URL } from '@/config/api';

export default function LessonsPage() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' });

    const fetchLessons = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/lessons`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setLessons(data.data || []);
        } catch (err) {
            console.error('Error fetching lessons:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_BASE_URL}/lessons/${deleteModal.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDeleteModal({ show: false, id: null, title: '' });
            fetchLessons();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const filteredLessons = lessons.filter(lesson =>
        lesson.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
    const paginatedLessons = filteredLessons.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const stats = {
        total: lessons.length,
        published: lessons.filter(l => l.isPublished).length,
        draft: lessons.filter(l => !l.isPublished).length,
        totalDuration: lessons.reduce((sum, l) => sum + (l.videoDuration || 0), 0)
    };

    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m ${seconds % 60}s`;
    };

    return (
        <div className="p-4 md:p-8 space-y-10 min-h-screen bg-slate-50 dark:bg-slate-950">

            {/* Dynamic Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-indigo-500/20 transform hover:rotate-6 transition-transform">
                        <FiPlay className="text-white ml-1" size={32} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Lesson Master</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1 flex items-center gap-2 italic">
                            <span className="w-8 h-px bg-slate-200"></span> Orchestrating atomic content delivery
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchLessons}
                        disabled={loading}
                        className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all shadow-sm active:scale-95"
                    >
                        <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <Link href="/dashboard/admin/lesson/create">
                        <button className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-indigo-600 hover:scale-[1.02] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-500/10 active:scale-95 group">
                            <FiPlus size={22} className="group-hover:rotate-90 transition-transform" />
                            Deploy Content
                        </button>
                    </Link>
                </div>
            </div>

            {/* KPI Dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-indigo-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                            <FiPlay size={20} />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-none">Total Units</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stats.total}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <FiLayers className="text-indigo-400" /> Lesson nodes
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-emerald-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                            <FiCheckCircle size={20} />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-none">Public Assets</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stats.published}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <FiMonitor className="text-emerald-400" /> Active stream
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-amber-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                            <FiClock size={20} />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-none">Playback Time</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatDuration(stats.totalDuration)}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <FiTrendingUp className="text-amber-400" /> Cumulative time
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                            <FiFilter size={20} />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-none">Staged</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stats.draft}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">
                        Pending review
                    </div>
                </div>
            </div>

            {/* Central Control Space */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Filter content by title, module or course identifier..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 text-sm font-bold tracking-tight text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Table Visualization */}
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl shadow-indigo-500/5 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                                    <th className="text-left px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Unit</th>
                                    <th className="text-left px-8 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Architecture Path</th>
                                    <th className="text-left px-8 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Metrics</th>
                                    <th className="text-left px-8 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Integrity</th>
                                    <th className="text-right px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Command Center</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-24 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <FiRefreshCw className="animate-spin text-indigo-500" size={32} />
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compiling content nodes...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedLessons.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-32 text-center text-slate-300">
                                            <div className="flex flex-col items-center gap-4 grayscale opacity-40">
                                                <FiPlay size={48} />
                                                <p className="text-sm font-black uppercase tracking-widest">No matching assets in the current buffer</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedLessons.map((lesson, idx) => (
                                        <tr key={lesson._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-all duration-300">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white shadow-xl transition-all group-hover:scale-110 group-hover:rotate-3 group-hover:border-indigo-500/20">
                                                        <FiPlay size={24} fill={lesson.isPublished ? 'currentColor' : 'none'} className={lesson.isPublished ? 'text-indigo-500 ml-1' : 'text-slate-300'} />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-tight uppercase group-hover:text-indigo-500 transition-colors">{lesson.title}</h3>
                                                        <p className="text-[10px] font-bold text-slate-400 truncate max-w-[200px] leading-relaxed uppercase tracking-widest italic">{lesson.description?.slice(0, 40) || 'NO_CONTEXT_PROVIDED'}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="space-y-1.5 min-w-[150px]">
                                                    <div className="flex items-center gap-2">
                                                        <FiBook className="text-indigo-400 shrink-0" size={12} />
                                                        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight line-clamp-1">{lesson.course?.title || 'ORPHANED_CORE'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-60">
                                                        <FiLayers size={10} className="shrink-0" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-1">{lesson.module?.title || 'UNMAPPED_NODE'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 group-hover:text-amber-500 transition-colors">
                                                    <FiClock size={14} />
                                                    <span className="text-[11px] font-black uppercase tracking-tight">{lesson.videoDuration ? formatDuration(lesson.videoDuration) : '00:00:00'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${lesson.isPublished
                                                    ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20'
                                                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${lesson.isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                                    {lesson.isPublished ? 'Verified' : 'Review'}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                                    <Link
                                                        href={`/dashboard/admin/lesson/edit/${lesson._id}`}
                                                        className="w-12 h-12 bg-white dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 transition-all shadow-sm active:scale-95"
                                                    >
                                                        <FiEdit2 size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteModal({ show: true, id: lesson._id, title: lesson.title })}
                                                        className="w-12 h-12 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between px-10 py-10 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 gap-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Showing <span className="text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredLessons.length)}</span> of {filteredLessons.length} units
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-all shadow-sm active:scale-90"
                                >
                                    <FiChevronLeft size={18} />
                                </button>
                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-12 h-12 rounded-2xl text-[10px] font-black transition-all ${currentPage === i + 1
                                                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'
                                                : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800'
                                                }`}
                                        >
                                            {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-all shadow-sm active:scale-90"
                                >
                                    <FiChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Terminal Delete Confirmation */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 w-full max-w-lg shadow-[0_0_100px_rgba(0,0,0,0.4)] border border-white/10 animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                            <FiTrash2 size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter mb-4 uppercase">Irreversible Wipe?</h3>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tight">
                            Confirm destruction of identifying node <span className="text-rose-500 font-black italic">"{deleteModal.title}"</span>.
                            All associated stream pointers will be dissolved.
                        </p>
                        <div className="flex items-center gap-4 mt-10">
                            <button
                                onClick={() => setDeleteModal({ show: false, id: null, title: '' })}
                                className="flex-1 py-5 rounded-2xl border border-slate-100 dark:border-slate-800 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-rose-500/30 transition-all active:scale-95"
                            >
                                Execute Purge
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
