'use client';

import React, { useEffect, useState } from 'react';
import {
    FiPlus, FiEdit3, FiTrash2, FiLoader, FiCheck, FiSearch,
    FiRefreshCw, FiImage, FiStar, FiDownload, FiEye,
    FiExternalLink, FiPackage, FiGrid, FiList
} from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config/api';

const PLATFORM_OPTIONS = [
    'Figma', 'Photoshop', 'Illustrator', 'Adobe XD', 'Sketch', 'Canva',
    'HTML/CSS', 'React', 'Next.js', 'Tailwind CSS', 'WordPress',
    'Elementor', 'Bootstrap', 'InDesign', 'After Effects', 'Premiere Pro', 'Other'
];

const DesignTemplatePage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const router = useRouter();

    const fetchTemplates = async () => {
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/design-templates/admin/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            setTemplates(result.data || []);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this template?")) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE_URL}/design-templates/admin/managed/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchTemplates();
            } else {
                const data = await res.json();
                alert(data.message || 'Delete failed');
            }
        } catch (err) { alert("Delete failed"); }
    };

    const handleEdit = (id) => {
        router.push(`/dashboard/admin/design-template/create?edit=${id}`);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded text-[10px] font-medium flex items-center gap-1"><FiCheck size={10} /> Live</span>;
            case 'pending': return <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded text-[10px] font-medium">Pending</span>;
            case 'draft': return <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded text-[10px] font-medium">Draft</span>;
            default: return <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded text-[10px] font-medium">{status}</span>;
        }
    };

    const getPlatformBadgeColor = (platform) => {
        const colors = {
            'Figma': 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
            'Photoshop': 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
            'Illustrator': 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
            'WordPress': 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
            'React': 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
            'HTML/CSS': 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
        };
        return colors[platform] || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
    };

    const stats = {
        total: templates.length,
        approved: templates.filter(s => s.status === 'approved').length,
        pending: templates.filter(s => s.status === 'pending').length,
        featured: templates.filter(s => s.isFeatured).length,
    };

    const filtered = templates.filter(s => {
        const matchSearch = s.title?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || s.status === statusFilter;
        const matchPlatform = platformFilter === 'all' || s.platform === platformFilter;
        return matchSearch && matchStatus && matchPlatform;
    });

    return (
        <div className="p-4 md:p-6 space-y-5 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-indigo-500 flex items-center justify-center">
                        <FiImage className="text-white" size={18} />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Design Templates</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Manage design templates & assets</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchTemplates}
                        disabled={loading}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-md text-sm font-medium transition-all disabled:opacity-50"
                    >
                        <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        Reload
                    </button>
                    <Link href="/dashboard/admin/design-template/create">
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm font-medium transition-all">
                            <FiPlus size={14} />
                            Add Template
                        </button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-slate-700 rounded-md flex items-center justify-center">
                            <FiPackage className="text-white" size={14} />
                        </div>
                        <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.total}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center">
                            <FiCheck className="text-white" size={14} />
                        </div>
                        <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.approved}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Approved</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center">
                            <FiLoader className="text-white" size={14} />
                        </div>
                        <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.pending}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                            <FiStar className="text-white" size={14} />
                        </div>
                        <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.featured}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Featured</p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        placeholder="Search templates..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-indigo-400 outline-none text-sm transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                    {['all', 'approved', 'pending', 'draft'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${statusFilter === status
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                }`}
                        >
                            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
                <select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-md text-sm bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 outline-none text-slate-700 dark:text-slate-300"
                >
                    <option value="all">All Platforms</option>
                    {PLATFORM_OPTIONS.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500'}`}
                    >
                        <FiGrid size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500'}`}
                    >
                        <FiList size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <FiLoader className="animate-spin text-indigo-500" size={32} />
                    <p className="text-sm text-slate-500 font-medium italic">Synchronizing assets...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-md border border-dashed border-slate-300 dark:border-slate-600">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FiImage className="text-xl text-slate-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800 dark:text-white">No Templates Found</h3>
                    <p className="text-sm text-slate-500 mt-1">Add your first design template</p>
                    <Link href="/dashboard/admin/design-template/create">
                        <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md mx-auto hover:scale-105 active:scale-95 transition-all">
                            <FiPlus size={14} /> Add Template
                        </button>
                    </Link>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((sw) => (
                        <div key={sw._id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all group">
                            <div className="relative h-44 bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                {sw.images?.[0] ? (
                                    <img src={sw.images[0]} alt={sw.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center grayscale opacity-30">
                                        <FiImage size={48} />
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 bg-black/20 backdrop-blur-sm p-1 rounded-lg">
                                    {sw.isFeatured && (
                                        <span className="px-2 py-0.5 bg-yellow-400 text-slate-900 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm">
                                            Featured
                                        </span>
                                    )}
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm ${getPlatformBadgeColor(sw.platform)}`}>
                                        {sw.platform}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                    {getStatusBadge(sw.status)}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1 mb-2 group-hover:text-indigo-500 transition-colors">{sw.title}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">v{sw.version}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500">{sw.templateType}</span>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-4 py-2 border-y border-slate-50 dark:border-slate-800/50">
                                    <span className="flex items-center gap-1">
                                        <FiStar className="text-amber-500" size={12} fill="currentColor" /> {sw.rating?.toFixed(1) || '4.8'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiDownload size={12} /> {sw.salesCount || 0} Sales
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        {sw.accessType === 'free' ? (
                                            <span className="text-lg font-black text-emerald-500 tracking-tighter">FREE</span>
                                        ) : (
                                            <div className="flex flex-col">
                                                {sw.offerPrice && sw.offerPrice < sw.price && (
                                                    <span className="text-[10px] text-slate-400 line-through leading-none mb-1">৳{sw.price}</span>
                                                )}
                                                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tighter leading-none">৳{sw.offerPrice || sw.price}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(sw._id)} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white rounded-xl transition-all shadow-sm" title="Edit Template">
                                            <FiEdit3 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(sw._id)} className="p-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm" title="Delete Template">
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700 shadow-sm">
                    {filtered.map((sw) => (
                        <div key={sw._id} className="flex items-center gap-6 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                            <div className="w-20 h-14 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-600 shadow-inner">
                                {sw.images?.[0] ? (
                                    <img src={sw.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-20">
                                        <FiImage size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-indigo-500 transition-colors">{sw.title}</h3>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-3">
                                    <span className={`px-2 py-0.5 rounded font-black uppercase tracking-tighter ${getPlatformBadgeColor(sw.platform)}`}>{sw.platform}</span>
                                    <span className="font-bold">{sw.templateType}</span>
                                    <span className="font-bold">v{sw.version}</span>
                                </div>
                            </div>
                            <div className="text-right shrink-0 px-4 border-l border-slate-100 dark:border-slate-800">
                                {sw.accessType === 'free' ? (
                                    <p className="text-sm font-black text-emerald-500 tracking-tighter">FREE</p>
                                ) : (
                                    <p className="text-sm font-black text-slate-800 dark:text-white tracking-tighter">৳{sw.offerPrice || sw.price}</p>
                                )}
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{sw.salesCount || 0} SOLD</p>
                            </div>
                            <div className="shrink-0">{getStatusBadge(sw.status)}</div>
                            <div className="flex gap-2 ml-4">
                                {sw.previewUrl && (
                                    <a href={sw.previewUrl} target="_blank" className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all" title="View Preview">
                                        <FiEye size={16} />
                                    </a>
                                )}
                                <button onClick={() => handleEdit(sw._id)} className="p-2.5 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-xl transition-all" title="Edit Template">
                                    <FiEdit3 size={16} />
                                </button>
                                <button onClick={() => handleDelete(sw._id)} className="p-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all" title="Delete Template">
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DesignTemplatePage;
