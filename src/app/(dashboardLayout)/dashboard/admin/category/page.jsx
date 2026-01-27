'use client';

import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit3, FiTrash2, FiLoader, FiCheck, FiX, FiGrid, FiSearch, FiRefreshCw, FiBook, FiCode, FiLayout, FiFolder, FiChevronRight, FiChevronDown, FiLayers } from 'react-icons/fi';
import Link from 'next/link';
import { API_BASE_URL } from '@/config/api';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [hierarchicalData, setHierarchicalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('tree');
  const [expandedParents, setExpandedParents] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      // Admin dashboard always uses Admin API which returns everything
      const res = await fetch(`${API_BASE_URL}/categories/admin/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      setCategories(result.data || []);

      const hierRes = await fetch(`${API_BASE_URL}/categories/hierarchical${typeFilter !== 'all' ? `?type=${typeFilter}` : ''}`);
      const hierData = await hierRes.json();
      setHierarchicalData(hierData.data || []);

      const parentsRes = await fetch(`${API_BASE_URL}/categories/admin/parents`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const parentsData = await parentsRes.json();
      setParentCategories(parentsData.data || []);

      setExpandedParents((hierData.data || []).map(p => p._id));
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, [typeFilter]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this category?")) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/categories/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.message || 'Delete failed');
      }
    } catch (err) { alert("Delete failed"); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/categories/admin/${editData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editData.name,
          slug: editData.slug,
          description: editData.description,
          image: editData.image,
          status: editData.status,
          type: editData.type,
          isParent: editData.isParent,
          parentCategory: editData.isParent ? null : (editData.parentCategory?._id || editData.parentCategory)
        }),
      });
      if (res.ok) {
        setEditData(null);
        fetchCategories();
      } else {
        const err = await res.json();
        alert(`Update failed: ${err.message}`);
      }
    } catch (err) { alert("Network error"); }
  };

  const toggleExpand = (id) => {
    setExpandedParents(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course': return 'bg-indigo-500';
      case 'website': return 'bg-emerald-500';
      case 'design-template': return 'bg-indigo-600';
      default: return 'bg-slate-500';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'course': return 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400';
      case 'website': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'design-template': return 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return <FiBook size={14} />;
      case 'website': return <FiLayout size={14} />;
      case 'design-template': return <FiLayers size={14} />;
      default: return <FiGrid size={14} />;
    }
  };

  const stats = {
    total: categories.length,
    course: categories.filter(c => c.type === 'course').length,
    website: categories.filter(c => c.type === 'website').length,
    designTemplate: categories.filter(c => c.type === 'design-template').length,
    parents: categories.filter(c => c.isParent).length,
  };

  const filtered = categories.filter(c => {
    const matchSearch = c.name?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="p-4 md:p-6 space-y-5 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FiFolder className="text-white" size={18} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">Organization</h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Manage your product taxonomy</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchCategories} className="p-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl transition-all shadow-sm">
            <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <Link href="/dashboard/admin/category/create">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              <FiPlus size={16} /> New Category
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300">
              <FiGrid size={14} />
            </div>
            <span className="text-xl font-black text-slate-800 dark:text-white leading-none">{stats.total}</span>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Total</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500">
              <FiBook size={14} />
            </div>
            <span className="text-xl font-black text-slate-800 dark:text-white leading-none">{stats.course}</span>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Courses</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
              <FiLayout size={14} />
            </div>
            <span className="text-xl font-black text-slate-800 dark:text-white leading-none">{stats.website}</span>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Websites</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-600/30 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-600/10 rounded-lg flex items-center justify-center text-indigo-600">
              <FiLayers size={14} />
            </div>
            <span className="text-xl font-black text-slate-800 dark:text-white leading-none">{stats.designTemplate}</span>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Designs</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-amber-50 dark:bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
              <FiFolder size={14} />
            </div>
            <span className="text-xl font-black text-slate-800 dark:text-white leading-none">{stats.parents}</span>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Root Groups</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            placeholder="Filter categories by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/10 outline-none text-sm font-medium transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 px-1">
          {['all', 'course', 'website', 'design-template'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm active:scale-95 ${typeFilter === type
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-600'
                }`}
            >
              {type === 'all' ? 'Everything' : type === 'design-template' ? 'Designs' : type}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('tree')}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'tree' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Structure
          </button>
          <button
            onClick={() => setViewMode('flat')}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'flat' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <FiLoader className="animate-spin text-indigo-500" size={40} />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Building taxonomy tree...</p>
        </div>
      ) : viewMode === 'tree' ? (
        <div className="space-y-4">
          {hierarchicalData.length === 0 ? (
            <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 px-6">
              <FiFolder size={64} className="text-slate-100 dark:text-slate-700 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Classification Empty</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">Create a parent category to start building your product structure.</p>
              <Link href="/dashboard/admin/category/create">
                <button className="mt-8 flex items-center gap-2 px-8 py-3 bg-indigo-500 text-white text-sm font-bold rounded-2xl mx-auto shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                  <FiPlus size={20} /> Create Root Category
                </button>
              </Link>
            </div>
          ) : (
            hierarchicalData.map((parent, idx) => (
              <div key={parent._id} className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-center gap-4 p-5">
                  <button
                    onClick={() => toggleExpand(parent._id)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${expandedParents.includes(parent._id) ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-slate-600'}`}
                  >
                    {expandedParents.includes(parent._id) ? <FiChevronDown size={20} /> : <FiChevronRight size={20} />}
                  </button>
                  <div className={`w-14 h-14 rounded-2xl ${getTypeColor(parent.type)} flex items-center justify-center text-white overflow-hidden shadow-lg border-4 border-white dark:border-slate-700`}>
                    {parent.image ? <img src={parent.image} className="w-full h-full object-cover" /> : <FiFolder size={24} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-slate-800 dark:text-white tracking-tight leading-none mb-2">{parent.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 ${getTypeBadgeColor(parent.type)} rounded-lg text-[9px] font-black uppercase tracking-widest`}>{parent.type}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <FiLayers size={10} /> {parent.children?.length || 0} Sub-categories
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 pr-2">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${parent.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                      {parent.status}
                    </span>
                    <p className="text-[9px] font-mono text-slate-300 dark:text-slate-600">/{parent.slug}</p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setEditData(parent)} className="p-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-900 dark:hover:bg-indigo-600 text-slate-400 hover:text-white rounded-2xl transition-all shadow-sm">
                      <FiEdit3 size={16} />
                    </button>
                    <button onClick={() => handleDelete(parent._id)} className="p-3 bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl transition-all shadow-sm">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                {expandedParents.includes(parent._id) && parent.children?.length > 0 && (
                  <div className="bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700/50">
                    {parent.children.map((child, idx) => (
                      <div key={child._id} className={`flex items-center gap-4 py-4 px-6 pl-24 hover:bg-white dark:hover:bg-slate-800 transition-all ${idx < parent.children.length - 1 ? 'border-b border-slate-100/50 dark:border-slate-800/30' : ''}`}>
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                          {getTypeIcon(child.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200 tracking-tight">{child.name}</p>
                          <p className="text-[10px] font-mono text-slate-400">slug: {child.slug}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${child.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                          {child.status}
                        </span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditData(child)} className="p-2 bg-white dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl border border-slate-200 dark:border-slate-600 transition-all">
                            <FiEdit3 size={14} />
                          </button>
                          <button onClick={() => handleDelete(child._id)} className="p-2 bg-white dark:bg-slate-700 hover:bg-rose-500 hover:text-white text-rose-300 rounded-xl border border-slate-200 dark:border-slate-600 transition-all">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <FiSearch size={48} className="text-slate-200 mx-auto mb-4" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No classification matches your search</p>
            </div>
          ) : (
            filtered.map((cat, idx) => (
              <div key={cat._id} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-indigo-500/30 transition-all group animate-in zoom-in-95 duration-300" style={{ animationDelay: `${idx * 30}ms` }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${getTypeColor(cat.type)} flex items-center justify-center text-white overflow-hidden shadow-lg group-hover:scale-110 transition-transform`}>
                    {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : (cat.isParent ? <FiFolder size={24} /> : getTypeIcon(cat.type))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white truncate tracking-tight">{cat.name}</h3>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">/{cat.slug}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  <span className={`px-2 py-0.5 ${getTypeBadgeColor(cat.type)} rounded-lg text-[9px] font-black uppercase tracking-widest`}>{cat.type}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${cat.isParent ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                    {cat.isParent ? 'Root' : 'Leaf'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${cat.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                    {cat.status}
                  </span>
                </div>
                {cat.parentCategory && (
                  <div className="mb-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                    <FiChevronRight size={12} className="text-slate-300" />
                    <span className="line-clamp-1">Under: {cat.parentCategory.name}</span>
                  </div>
                )}
                <div className="flex gap-2 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                  <button onClick={() => setEditData(cat)} className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-900 dark:hover:bg-indigo-600 text-slate-600 dark:text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">
                    Modify
                  </button>
                  <button onClick={() => handleDelete(cat._id)} className="p-2.5 bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all shadow-sm">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modern Slide-over Modal */}
      {editData && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-end z-[100] p-4 lg:p-6 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 h-full w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${getTypeColor(editData.type)}`}>
                    <FiEdit3 size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">Modify Asset</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {editData.isParent ? 'Top Level Classification' : 'Sub-Category Unit'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setEditData(null)} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-2xl transition-all shadow-xl active:scale-90">
                  <FiX size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Display Identifier</label>
                  <input
                    type="text"
                    value={editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-base font-bold text-slate-800 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="e.g. Design Templates"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">URL Key (Slug)</label>
                  <input
                    type="text"
                    value={editData.slug || ''}
                    onChange={(e) => setEditData({ ...editData, slug: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-mono text-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Thumbnail / Cover URL</label>
                  <div className="relative">
                    <FiImage className="absolute left-5 top-5 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={editData.image || ''}
                      onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Brief Context / Notes</label>
                  <textarea
                    value={editData.description || ''}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm leading-relaxed focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                    placeholder="Describe what belongs here..."
                  ></textarea>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-3 block tracking-widest">Object Blueprint</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['course', 'website', 'design-template'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEditData({ ...editData, type })}
                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${editData.type === type
                          ? `${getTypeColor(type).replace('bg-', 'bg-')} text-white shadow-lg`
                          : 'bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50'
                          }`}
                      >
                        {type === 'design-template' ? 'Designs' : type}
                      </button>
                    ))}
                  </div>
                </div>

                {!editData.isParent && (
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-3 block tracking-widest">Hierarchy Parent</label>
                    <div className="relative">
                      <FiChevronRight className="absolute left-4 top-4 text-slate-400" size={16} />
                      <select
                        value={editData.parentCategory?._id || editData.parentCategory || ''}
                        onChange={(e) => setEditData({ ...editData, parentCategory: e.target.value })}
                        className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-bold appearance-none outline-none ring-1 ring-slate-100 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Move to Root</option>
                        {parentCategories
                          .filter(p => p.type === editData.type && p._id !== editData._id)
                          .map(p => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between bg-slate-900 p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-widest text-white leading-none mb-1">Active Status</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Public Visibility</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditData({ ...editData, status: editData.status === 'active' ? 'inactive' : 'active' })}
                    className={`relative w-16 h-8 rounded-full transition-all flex items-center p-1 relative z-10 ${editData.status === 'active' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-slate-700'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 transform ${editData.status === 'active' ? 'translate-x-8' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditData(null)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                >
                  <FiCheck size={18} /> Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
