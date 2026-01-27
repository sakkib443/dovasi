'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiLoader, FiImage, FiGlobe, FiInfo, FiBook, FiCode, FiLayout, FiCheck, FiFolder, FiChevronRight, FiLayers } from 'react-icons/fi';
import Link from 'next/link';
import { API_BASE_URL } from '@/config/api';

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    status: 'active',
    type: 'course',
    isParent: false,
    parentCategory: null
  });
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch parent categories
  useEffect(() => {
    const fetchParents = async () => {
      const BASE_URL = API_BASE_URL;
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${BASE_URL}/categories/admin/parents`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setParentCategories(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchParents();
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name) {
      const slugified = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: slugified }));
    }
  }, [formData.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const BASE_URL = API_BASE_URL;
    const token = localStorage.getItem('token');

    // Prepare payload
    const payload = {
      ...formData,
      parentCategory: formData.isParent ? null : formData.parentCategory
    };

    try {
      const response = await fetch(`${BASE_URL}/categories/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Category created successfully! 🚀');
        router.push('/dashboard/admin/category');
      } else {
        alert(result.message || 'Failed to create category');
      }
    } catch (error) {
      alert('Network error - check backend connectivity');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course': return 'from-indigo-500 to-purple-500';
      case 'website': return 'from-emerald-500 to-teal-500';
      case 'design-template': return 'from-indigo-600 to-violet-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const typeOptions = [
    { value: 'course', label: 'Course', icon: FiBook, desc: 'LMS & Education', color: 'indigo' },
    { value: 'website', label: 'Website', icon: FiLayout, desc: 'Templates & Themes', color: 'emerald' },
    { value: 'design-template', label: 'Design Template', icon: FiLayers, desc: 'UI Kits & Landing Pages', color: 'indigo' },
  ];

  // Filter parent categories by selected type
  const filteredParents = parentCategories.filter(p => p.type === formData.type);

  const inputClass = "w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white";
  const labelClass = "text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-3";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard/admin/category" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.2rem] text-slate-500 hover:text-indigo-500 hover:border-indigo-500/20 transition-all shadow-xl active:scale-95">
              <FiArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Classify Assets</h1>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">Define a new segment in your product ecosystem</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Core Setup */}
          <div className="lg:col-span-12 space-y-10">

            {/* Hierarchy Level Selection */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 p-10 border border-slate-100 dark:border-slate-800">
              <label className={labelClass}>Structural Position</label>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isParent: true, parentCategory: null })}
                  className={`p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col items-center group ${formData.isParent
                    ? 'border-indigo-500 bg-indigo-500 text-white shadow-2xl shadow-indigo-500/30'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-indigo-500/30'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${formData.isParent ? 'bg-white/20' : 'bg-white dark:bg-slate-700 shadow-sm group-hover:scale-110'}`}>
                    <FiFolder size={28} className={formData.isParent ? 'text-white' : 'text-slate-400'} />
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest text-center">Root Group</p>
                  <p className={`text-[9px] font-bold text-center mt-2 px-4 opacity-80 ${formData.isParent ? 'text-white' : 'text-slate-400'}`}>
                    Primary namespace for organizing sub-segments
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isParent: false })}
                  className={`p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col items-center group ${!formData.isParent
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-emerald-500/30'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${!formData.isParent ? 'bg-white/20' : 'bg-white dark:bg-slate-700 shadow-sm group-hover:scale-110'}`}>
                    <FiChevronRight size={28} className={!formData.isParent ? 'text-white' : 'text-slate-400'} />
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest text-center">Leaf Category</p>
                  <p className={`text-[9px] font-bold text-center mt-2 px-4 opacity-80 ${!formData.isParent ? 'text-white' : 'text-slate-400'}`}>
                    Functional unit belonging to a major group
                  </p>
                </button>
              </div>
            </div>

            {/* Category Definition */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 p-10 border border-slate-100 dark:border-slate-800 space-y-12">

              {/* Type Selection */}
              <div>
                <label className={labelClass}>Domain Authority</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {typeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: option.value, parentCategory: null })}
                      className={`p-8 rounded-[2rem] border-2 transition-all group relative overflow-hidden ${formData.type === option.value
                        ? `border-transparent bg-gradient-to-br ${getTypeColor(option.value)} text-white shadow-2xl`
                        : 'border-slate-100 dark:border-slate-800 hover:border-indigo-500/20 shadow-sm'
                        }`}
                    >
                      <div className="relative z-10 flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${formData.type === option.value ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:scale-110'}`}>
                          <option.icon size={28} />
                        </div>
                        <p className="text-xs font-black uppercase tracking-[0.2em]">{option.label}</p>
                        <p className={`text-[8px] font-bold uppercase tracking-widest mt-2 opacity-60 ${formData.type === option.value ? 'text-white' : 'text-slate-400'}`}>{option.desc}</p>
                      </div>
                      {formData.type === option.value && (
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform">
                          <option.icon size={120} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hierarchy Connector (for sub-categories) */}
              {!formData.isParent && (
                <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <FiLayers className="text-indigo-500" />
                    <label className={labelClass}>Association Map</label>
                  </div>
                  {filteredParents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                        <FiInfo className="text-amber-600" size={24} />
                      </div>
                      <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">Parental Void</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        Create a root group for "{formData.type}" before adding sub-units.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredParents.map(parent => (
                        <button
                          key={parent._id}
                          type="button"
                          onClick={() => setFormData({ ...formData, parentCategory: parent._id })}
                          className={`p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${formData.parentCategory === parent._id
                            ? 'border-indigo-500 bg-white dark:bg-slate-900 shadow-xl'
                            : 'border-transparent bg-white dark:bg-slate-900 group-hover:border-slate-100'
                            }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${formData.parentCategory === parent._id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                            {parent.image ? <img src={parent.image} className="w-full h-full object-cover rounded-xl" /> : <FiFolder size={20} />}
                          </div>
                          <div className="text-left">
                            <p className={`text-xs font-black uppercase tracking-tight ${formData.parentCategory === parent._id ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-300'}`}>{parent.name}</p>
                            <p className="text-[9px] font-mono text-slate-400 mt-0.5">/{parent.slug}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Identification Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Public Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern UI Frameworks"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>System Identifier (URL Key)</label>
                    <div className="relative">
                      <FiGlobe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        readOnly
                        value={formData.slug}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-mono text-indigo-500 font-bold"
                        placeholder="generated-slug"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Status Configuration</label>
                    <div className="p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, status: 'active' })}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${formData.status === 'active' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-slate-400'}`}
                      >
                        {formData.status === 'active' && <FiCheck />} Public
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, status: 'inactive' })}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${formData.status !== 'active' ? 'bg-slate-800 text-white shadow-xl shadow-slate-900/40' : 'text-slate-400'}`}
                      >
                        Private
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Symbolic URI (Image)</label>
                    <div className="relative">
                      <FiImage className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className={inputClass.replace("px-5", "pl-14")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Area */}
              <div className="space-y-4 pt-6">
                <label className={labelClass}>Semantic Context (Description)</label>
                <textarea
                  rows={4}
                  placeholder="Provide a detailed breakdown of what this category represents in our ecosystem..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputClass} resize-none leading-relaxed text-sm font-medium`}
                ></textarea>
              </div>

              {/* Submit Action */}
              <div className="pt-10 flex flex-col md:flex-row items-center gap-6">
                <button
                  type="submit"
                  disabled={loading || (!formData.isParent && !formData.parentCategory)}
                  className={`flex-1 h-20 rounded-3xl text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-2xl relative overflow-hidden group ${loading || (!formData.isParent && !formData.parentCategory)
                    ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-50'
                    : 'bg-slate-900 dark:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                >
                  {loading ? (
                    <FiLoader className="animate-spin" size={24} />
                  ) : (
                    <>
                      <FiSave size={24} />
                      Commit New Classification
                    </>
                  )}
                  {!loading && !(!formData.isParent && !formData.parentCategory) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Technical Brief */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <FiInfo size={180} />
          </div>
          <div className="relative z-10 flex flex-wrap gap-10">
            <div className="flex-1 min-w-[240px] space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-3">
                <span className="w-8 h-px bg-emerald-400"></span> Governance Guide
              </h4>
              <p className="text-xs font-bold leading-relaxed text-slate-400">
                Each category acts as a routing node for your products.
                <span className="text-white"> Root Groups</span> should be broad (e.g., Coding), while
                <span className="text-white"> Leaf Categories</span> should be specific technologies (e.g., Node.js).
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 min-w-[240px]">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[9px] font-black text-indigo-400 uppercase mb-2">SLUG Engine</p>
                <p className="text-[10px] font-bold text-slate-300">Automated SEO-friendly path generation based on name.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[9px] font-black text-emerald-400 uppercase mb-2">Discovery</p>
                <p className="text-[10px] font-bold text-slate-300">Immediate synchronization across marketplace filters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
