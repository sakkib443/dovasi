'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiBook,
  FiStar,
  FiGrid,
  FiList,
  FiUsers,
  FiLayers,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiMonitor,
  FiAward
} from 'react-icons/fi';

import { API_BASE_URL } from '@/config/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const loadCourses = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setCourses(data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCourses((prev) => prev.filter((course) => course._id !== id));
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      alert('Network error!');
    }
  };

  const filtered = courses.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.instructorName?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: courses.length,
    published: courses.filter(c => c.status === 'published').length,
    draft: courses.filter(c => c.status === 'draft').length,
    totalEnrollments: courses.reduce((sum, c) => sum + (c.totalEnrollments || 0), 0),
  };

  const CourseSkeleton = () => (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden animate-pulse">
      <div className="h-44 bg-slate-100 dark:bg-slate-800"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4"></div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2"></div>
        <div className="flex gap-2 pt-4">
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex-1"></div>
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl flex items-center justify-center shadow-xl shadow-orange-500/20 transform hover:rotate-6 transition-transform">
            <FiBook className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Academic Assets</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1 flex items-center gap-2">
              <span className="w-8 h-px bg-slate-200"></span> Governance of educational content
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadCourses}
            disabled={loading}
            className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all shadow-sm active:scale-95"
            title="Reload Data"
          >
            <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <Link href="/dashboard/admin/course/create">
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/10 active:scale-95">
              <FiPlus size={20} />
              Publish Course
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-amber-500/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <FiBook size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Total Inventory</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stats.total}</p>
          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <FiLayers className="text-amber-500" /> Catalog items
          </div>
        </div>

        <div className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-emerald-500/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <FiCheckCircle size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Live Status</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stats.published}</p>
          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <FiMonitor className="text-emerald-500" /> Publicly visible
          </div>
        </div>

        <div className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-blue-500/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <FiUsers size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Student Reach</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stats.totalEnrollments.toLocaleString()}</p>
          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <FiTrendingUp className="text-blue-500" /> Active learners
          </div>
        </div>

        <div className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-900/10 transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
              <FiClock size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Staged Drafts</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stats.draft}</p>
          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <FiAward className="text-slate-400" /> In development
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            placeholder="Search by course title or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-7 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 outline-none text-sm font-bold tracking-tight transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
          />
        </div>
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-lg text-slate-900 dark:text-white transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <FiGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-lg text-slate-900 dark:text-white transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <FiList size={20} />
          </button>
        </div>
      </div>

      {/* Main Feed */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <CourseSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 px-6">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FiBook className="text-4xl text-slate-200 dark:text-slate-700" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Academic Silence</h3>
          <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto font-medium uppercase tracking-widest text-[9px]">No courses matched your query or catalog is empty</p>
          <Link href="/dashboard/admin/course/create">
            <button className="mt-10 flex items-center gap-3 px-10 py-5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl mx-auto shadow-2xl shadow-amber-500/20 active:scale-95 transition-all">
              <FiPlus size={20} /> Initiate New Series
            </button>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((course, idx) => (
            <div key={course._id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:border-amber-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200 grayscale dark:opacity-10">
                    <FiBook size={64} />
                  </div>
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-white/95 dark:bg-slate-900 shadow-xl text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                    {course.courseType}
                  </span>
                  <span className={`px-3 py-1 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl ${course.status === 'published' ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                    {course.status}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 px-4 py-2 bg-slate-900/80 backdrop-blur-md text-amber-500 text-sm font-black rounded-2xl border border-white/10 shadow-xl">
                  ৳{(course.discountPrice || course.price || 0).toLocaleString()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-black text-slate-800 dark:text-white line-clamp-2 mb-4 min-h-[48px] tracking-tight group-hover:text-amber-500 transition-colors uppercase leading-[1.2]">{course.title}</h3>

                <div className="flex items-center gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-amber-500/10">{course.level}</span>
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-md">{course.language}</span>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-slate-50 dark:border-slate-800/50">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <FiUsers className="text-blue-500" size={14} /> {course.totalEnrollments || 0} Learners
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 font-black text-xs">
                    <FiStar size={14} fill="currentColor" /> {course.averageRating || 5.0}
                  </div>
                </div>
              </div>

              <div className="flex p-2 bg-slate-50/50 dark:bg-slate-800/30 gap-1.5">
                <Link
                  href={`/dashboard/admin/course/modules/${course._id}`}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 text-indigo-500 rounded-2xl hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-[9px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95"
                >
                  Curriculum
                </Link>
                <Link
                  href={`/dashboard/admin/course/edit/${course._id}`}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 text-slate-500 rounded-2xl hover:bg-slate-900 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95"
                >
                  Modify
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="w-12 h-12 flex items-center justify-center bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800 shadow-sm">
          {filtered.map((course) => (
            <div key={course._id} className="flex flex-col md:flex-row md:items-center gap-6 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="w-32 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 shadow-lg border-2 border-white dark:border-slate-700">
                {course.thumbnail ? (
                  <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200 grayscale opacity-20">
                    <FiBook size={32} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-slate-800 dark:text-white truncate tracking-tight uppercase group-hover:text-amber-500 transition-colors">{course.title}</h3>
                <div className="text-[10px] text-slate-400 mt-2 flex flex-wrap items-center gap-4 font-black uppercase tracking-widest">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">ID: {course._id.slice(-6)}</span>
                  <span className="flex items-center gap-1.5"><FiAward className="text-amber-500" /> {course.level}</span>
                  <span className="flex items-center gap-1.5"><FiLayers className="text-indigo-500" /> {course.courseType}</span>
                </div>
              </div>
              <div className="text-left md:text-right shrink-0 px-6 md:border-l border-slate-100 dark:border-slate-800">
                <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter leading-none">৳{(course.price || 0).toLocaleString()}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{course.totalEnrollments || 0} ENROLLED</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/admin/course/modules/${course._id}`} className="p-3.5 bg-white dark:bg-slate-800 text-indigo-500 hover:bg-indigo-600 hover:text-white rounded-xl border border-slate-100 dark:border-slate-700 transition-all shadow-sm active:scale-95" title="Content Structure">
                  <FiLayers size={18} />
                </Link>
                <Link href={`/dashboard/admin/course/edit/${course._id}`} className="p-3.5 bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl border border-slate-100 dark:border-slate-700 transition-all shadow-sm active:scale-95" title="Modify Series">
                  <FiEdit2 size={18} />
                </Link>
                <button onClick={() => handleDelete(course._id)} className="p-3.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-95">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
