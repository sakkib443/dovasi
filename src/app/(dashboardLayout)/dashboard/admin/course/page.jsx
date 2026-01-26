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
} from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hiictpark-backend.vercel.app/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const loadCourses = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/courses`, {
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
      const res = await fetch(`${API_URL}/courses/${id}`, {
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
    <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
      <div className="h-36 bg-slate-100 dark:bg-slate-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-1/2"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded flex-1"></div>
          <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-5 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-amber-500 flex items-center justify-center">
            <FiBook className="text-white" size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Courses</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage all courses</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadCourses}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-md text-sm font-medium transition-all disabled:opacity-50"
          >
            <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Reload
          </button>
          <Link href="/dashboard/admin/course/create">
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm font-medium transition-all">
              <FiPlus size={14} />
              Add Course
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center">
              <FiBook className="text-white" size={14} />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.total}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Total Courses</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center">
              <FiCheckCircle className="text-white" size={14} />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.published}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Published</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-slate-500 rounded-md flex items-center justify-center">
              <FiClock className="text-white" size={14} />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.draft}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Draft</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <FiUsers className="text-white" size={14} />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">{stats.totalEnrollments}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Enrollments</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-amber-400 outline-none text-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-md">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500'}`}>
            <FiGrid size={16} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500'}`}>
            <FiList size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <CourseSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-md border border-dashed border-slate-300 dark:border-slate-600">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiBook className="text-xl text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">No Courses Found</h3>
          <p className="text-sm text-slate-500 mt-1">Create your first course to get started</p>
          <Link href="/dashboard/admin/course/create">
            <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-md mx-auto">
              <FiPlus size={14} /> Add Course
            </button>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((course) => (
            <div key={course._id} className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all">
              <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-700">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FiBook size={32} />
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 text-[10px] font-medium rounded">
                  {course.courseType}
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded">
                  ৳{(course.discountPrice || course.price || 0).toLocaleString()}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-slate-800 dark:text-white line-clamp-2 mb-2 min-h-[40px]">{course.title}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-medium rounded">{course.level}</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-medium rounded">{course.language}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1">
                    <FiUsers size={12} /> {course.totalEnrollments || 0}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <FiStar size={12} fill="currentColor" /> {course.averageRating || 5.0}
                  </div>
                </div>
              </div>

              <div className="flex border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <Link
                  href={`/dashboard/admin/course/modules/${course._id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 text-xs font-medium transition-all"
                >
                  <FiLayers size={12} /> Modules
                </Link>
                <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                <Link
                  href={`/dashboard/admin/course/edit/${course._id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 text-xs font-medium transition-all"
                >
                  <FiEdit2 size={12} /> Edit
                </Link>
                <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-rose-500 hover:bg-white dark:hover:bg-slate-700 text-xs font-medium transition-all"
                >
                  <FiTrash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700">
          {filtered.map((course) => (
            <div key={course._id} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="w-20 h-14 rounded-md bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
                {course.thumbnail ? (
                  <img src={course.thumbnail} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FiBook size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-800 dark:text-white truncate">{course.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px] font-medium">{course.courseType}</span>
                  <span>{course.level}</span>
                  <span>{course.language}</span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">৳{(course.price || 0).toLocaleString()}</p>
                <p className="text-xs text-slate-400">{course.totalEnrollments || 0} enrolled</p>
              </div>
              <div className="flex gap-1">
                <Link href={`/dashboard/admin/course/modules/${course._id}`} className="p-2 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 rounded-md transition-all">
                  <FiLayers size={14} />
                </Link>
                <Link href={`/dashboard/admin/course/edit/${course._id}`} className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-all">
                  <FiEdit2 size={14} />
                </Link>
                <button onClick={() => handleDelete(course._id)} className="p-2 bg-rose-50 dark:bg-rose-500/20 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/30 rounded-md transition-all">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
