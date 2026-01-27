'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    FiArrowLeft, FiSave, FiLoader, FiZap, FiGlobe, FiStar,
    FiPackage, FiSettings, FiTag, FiPlus, FiTrash2, FiFileText, FiCpu,
    FiDollarSign, FiImage, FiLink, FiCheck, FiLayers, FiCode, FiMonitor, FiEdit3, FiInfo
} from 'react-icons/fi';
import Link from 'next/link';
import { API_BASE_URL } from '@/config/api';

// Platform Options (matching backend)
const PLATFORM_OPTIONS = [
    'Figma', 'Photoshop', 'Illustrator', 'Adobe XD', 'Sketch', 'Canva',
    'HTML/CSS', 'React', 'Next.js', 'Tailwind CSS', 'WordPress',
    'Elementor', 'Bootstrap', 'InDesign', 'After Effects', 'Premiere Pro', 'Other'
];

// Design Template Type Options (matching backend)
const DESIGN_TYPE_OPTIONS = [
    'UI Kit', 'Website Template', 'Landing Page', 'Mobile App Design',
    'Social Media Graphic', 'Presentation', 'Logo', 'Vector Graphic',
    'Illustration', 'Print Template', 'Email Template', 'Icon Set',
    'Font', 'Mockup', 'Business Card', 'Flyer', 'Other'
];

const designTemplateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    platform: z.string().min(1, "Platform is required"),
    category: z.string().min(1, "Category is required"),
    templateType: z.string().min(1, "Template type is required"),
    accessType: z.enum(['free', 'paid']),
    version: z.string().min(1, "Version is required"),
    price: z.coerce.number().min(0),
    offerPrice: z.coerce.number().min(0).optional().nullable(),
    licenseType: z.enum(['regular', 'extended']),
    regularLicensePrice: z.coerce.number().min(0),
    extendedLicensePrice: z.coerce.number().min(0).optional().nullable(),
    description: z.string().min(1, "Description is required"),
    longDescription: z.string().optional(),
    changelog: z.string().optional(),
    features: z.array(z.string()).optional(),
    filesIncluded: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    compatibility: z.array(z.string()).optional(),
    images: z.array(z.string()).min(1, "At least one image is required"),
    previewUrl: z.string().optional(),
    downloadFile: z.string().min(1, "Download file URL is required"),
    documentationUrl: z.string().optional(),
    status: z.enum(['pending', 'approved', 'rejected', 'draft']),
    isFeatured: z.boolean().optional(),
});

export default function CreateDesignTemplatePage() {
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Check if we're in edit mode
    const editId = searchParams.get('edit');
    const isEditMode = !!editId;

    const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(designTemplateSchema),
        defaultValues: {
            status: 'approved',
            accessType: 'paid',
            licenseType: 'regular',
            version: '1.0.0',
            templateType: 'Website Template',
            platform: 'Figma',
            isFeatured: false,
            images: [''],
            features: [''],
            filesIncluded: [''],
            technologies: [''],
            compatibility: [''],
            price: 0,
            regularLicensePrice: 0,
        }
    });

    const imageFields = useFieldArray({ control, name: 'images' });
    const featureFields = useFieldArray({ control, name: 'features' });
    const fileIncludedFields = useFieldArray({ control, name: 'filesIncluded' });
    const techFields = useFieldArray({ control, name: 'technologies' });
    const compatibilityFields = useFieldArray({ control, name: 'compatibility' });

    useEffect(() => {
        const fetchCategories = async () => {
            const BASE_URL = API_BASE_URL;
            const token = localStorage.getItem('token');
            try {
                // Use the admin endpoint to get categories
                const res = await fetch(`${BASE_URL}/categories/admin/all?type=design-template`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setCategories(data.data || []);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (isEditMode && editId) {
            const BASE_URL = API_BASE_URL;
            const token = localStorage.getItem('token');

            const fetchTemplate = async () => {
                setFetchingData(true);
                try {
                    const res = await fetch(`${BASE_URL}/design-templates/${editId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.data) {
                        const sw = data.data;
                        reset({
                            title: sw.title || '',
                            platform: sw.platform || 'Figma',
                            category: sw.category?._id || sw.category || '',
                            templateType: sw.templateType || 'Website Template',
                            accessType: sw.accessType || 'paid',
                            version: sw.version || '1.0.0',
                            price: sw.price || 0,
                            offerPrice: sw.offerPrice || null,
                            licenseType: sw.licenseType || 'regular',
                            regularLicensePrice: sw.regularLicensePrice || 0,
                            extendedLicensePrice: sw.extendedLicensePrice || null,
                            description: sw.description || '',
                            longDescription: sw.longDescription || '',
                            changelog: sw.changelog || '',
                            features: sw.features?.length ? sw.features : [''],
                            filesIncluded: sw.filesIncluded?.length ? sw.filesIncluded : [''],
                            technologies: sw.technologies?.length ? sw.technologies : [''],
                            compatibility: sw.compatibility?.length ? sw.compatibility : [''],
                            images: sw.images?.length ? sw.images : [''],
                            previewUrl: sw.previewUrl || '',
                            downloadFile: sw.downloadFile || '',
                            documentationUrl: sw.documentationUrl || '',
                            status: sw.status || 'approved',
                            isFeatured: sw.isFeatured || false,
                        });
                    }
                } catch (err) {
                    console.error('Failed to fetch template:', err);
                } finally {
                    setFetchingData(false);
                }
            };
            fetchTemplate();
        }
    }, [isEditMode, editId, reset]);

    const onSubmit = async (values) => {
        setLoading(true);
        const BASE_URL = API_BASE_URL;
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        const cleanArray = (arr) => arr?.filter(item => item && item.trim() !== '') || [];

        const payload = {
            ...values,
            author: user._id,
            features: cleanArray(values.features),
            filesIncluded: cleanArray(values.filesIncluded),
            technologies: cleanArray(values.technologies),
            compatibility: cleanArray(values.compatibility),
            images: cleanArray(values.images),
            offerPrice: (values.offerPrice === 0 || !values.offerPrice) ? null : values.offerPrice,
            extendedLicensePrice: (values.extendedLicensePrice === 0 || !values.extendedLicensePrice) ? null : values.extendedLicensePrice,
        };

        try {
            const url = isEditMode
                ? `${BASE_URL}/design-templates/admin/managed/${editId}`
                : `${BASE_URL}/design-templates/admin`;

            const method = isEditMode ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                alert(isEditMode ? 'Template updated successfully! 🚀' : 'Template successfully published! 🎉');
                router.push('/dashboard/admin/design-template');
            } else {
                alert(`Error: ${result.message || 'Action failed'}`);
            }
        } catch (error) {
            alert('Network error - please check your connection');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all placeholder:text-slate-400";
    const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";
    const cardClass = "bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm";
    const sectionTitle = "text-sm font-bold uppercase tracking-wider text-emerald-600 mb-6 flex items-center gap-2";

    if (fetchingData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <FiLoader className="animate-spin text-emerald-600 mx-auto mb-4" size={48} />
                    <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">Fetching template data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-10">
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md py-4 transition-all">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/admin/design-template" className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm">
                        <FiArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                            {isEditMode ? <FiEdit3 className="text-emerald-500" /> : <FiZap className="text-emerald-500" />}
                            {isEditMode ? 'Edit Template' : 'Create Template'}
                        </h1>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {isEditMode ? `ID: ${editId}` : 'Add a new premium design asset'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/dashboard/admin/design-template')}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50 active:scale-95"
                    >
                        {loading ? <FiLoader className="animate-spin" /> : <FiSave size={16} />}
                        {loading ? 'Processing...' : isEditMode ? 'Update Template' : 'Publish Template'}
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Side: 8 Columns */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Basic Info */}
                    <div className={cardClass}>
                        <h2 className={sectionTitle}><FiInfo /> Meta Information</h2>

                        <div className="space-y-6">
                            <div>
                                <label className={labelClass}>Template Title</label>
                                <input
                                    {...register('title')}
                                    placeholder="e.g. Modern E-commerce UI Kit for Figma"
                                    className={inputClass}
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.title.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Tool/Platform</label>
                                    <div className="relative">
                                        <FiCode className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                        <select {...register('platform')} className={`${inputClass} pl-10 appearance-none`}>
                                            {PLATFORM_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Asset Category</label>
                                    <div className="relative">
                                        <FiTag className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                        <select {...register('category')} className={`${inputClass} pl-10 appearance-none`}>
                                            <option value="">Select Category</option>
                                            {categories.map(c => (
                                                <option key={c._id} value={c._id}>
                                                    {c.name} {c.status !== 'active' ? `(${c.status})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.category && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Template Type</label>
                                    <div className="relative">
                                        <FiLayers className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                        <select {...register('templateType')} className={`${inputClass} pl-10 appearance-none`}>
                                            {DESIGN_TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Release Version</label>
                                    <div className="relative">
                                        <FiBox className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                        <input {...register('version')} className={`${inputClass} pl-10`} placeholder="1.0.0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={cardClass}>
                        <h2 className={sectionTitle}><FiFileText /> Presentation Content</h2>
                        <div className="space-y-6">
                            <div>
                                <label className={labelClass}>Tagline / Short Description</label>
                                <textarea {...register('description')} rows={3} className={`${inputClass} resize-none`} placeholder="Describe the template's purpose and highlights..."></textarea>
                                {errors.description && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Detailed Overview (Markdown Supported)</label>
                                <textarea {...register('longDescription')} rows={8} className={`${inputClass} resize-none`} placeholder="Provide a detailed overview of what users get, technical specs, etc..."></textarea>
                            </div>
                            <div>
                                <label className={labelClass}>Recent Updates / Changelog</label>
                                <textarea {...register('changelog')} rows={3} className={`${inputClass} resize-none`} placeholder="v1.1.0 - Improved icons, fixed spacing..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Sub-Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Features */}
                        <div className={cardClass}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                    <FiCheck /> Core Features
                                </h2>
                                <button type="button" onClick={() => featureFields.append('')} className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
                                    <FiPlus size={14} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {featureFields.fields.map((field, idx) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input {...register(`features.${idx}`)} className={inputClass} placeholder="Exclusive icon set" />
                                        <button type="button" onClick={() => featureFields.remove(idx)} className="text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"><FiTrash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Files Included */}
                        <div className={cardClass}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                    <FiLayers /> Files Included
                                </h2>
                                <button type="button" onClick={() => fileIncludedFields.append('')} className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
                                    <FiPlus size={14} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {fileIncludedFields.fields.map((field, idx) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input {...register(`filesIncluded.${idx}`)} className={inputClass} placeholder=".fig, Documentation.pdf" />
                                        <button type="button" onClick={() => fileIncludedFields.remove(idx)} className="text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"><FiTrash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tech & Compatibility */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Compatibility */}
                        <div className={cardClass}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                    <FiMonitor /> Compatibility
                                </h2>
                                <button type="button" onClick={() => compatibilityFields.append('')} className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
                                    <FiPlus size={14} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {compatibilityFields.fields.map((field, idx) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input {...register(`compatibility.${idx}`)} className={inputClass} placeholder="Figma Desktop 2024+" />
                                        <button type="button" onClick={() => compatibilityFields.remove(idx)} className="text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"><FiTrash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className={cardClass}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                    <FiCpu /> Tech Stack
                                </h2>
                                <button type="button" onClick={() => techFields.append('')} className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
                                    <FiPlus size={14} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {techFields.fields.map((field, idx) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input {...register(`technologies.${idx}`)} className={inputClass} placeholder="Tailwind CSS, Next.js" />
                                        <button type="button" onClick={() => techFields.remove(idx)} className="text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"><FiTrash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >

                {/* Right Side: 4 Columns - Pricing & Media */}
                < div className="lg:col-span-4 space-y-8 sticky top-24" >

                    {/* Pricing Card */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <FiDollarSign size={120} />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-8 flex items-center gap-2">
                            <span className="w-8 h-px bg-emerald-400 mr-2"></span>
                            Pricing & Licenses
                        </h2>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Access Mode</label>
                                <select {...register('accessType', {
                                    onChange: (e) => {
                                        if (e.target.value === 'free') {
                                            setValue('price', 0);
                                            setValue('offerPrice', null);
                                        }
                                    }
                                })} className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 text-white font-bold outline-none ring-1 ring-slate-700 focus:ring-emerald-500">
                                    <option value="paid">Premium (Paid)</option>
                                    <option value="free">Community (Free)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Base Price (৳)</label>
                                    <input type="number" {...register('price')} disabled={watch('accessType') === 'free'} className="w-full bg-slate-800/50 border-b border-slate-700 py-3 px-2 text-xl font-black text-white focus:border-emerald-500 outline-none disabled:opacity-30" placeholder="0" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Sale Price (৳)</label>
                                    <input type="number" {...register('offerPrice')} disabled={watch('accessType') === 'free'} className="w-full bg-slate-800/50 border-b border-slate-700 py-3 px-2 text-xl font-black text-white focus:border-emerald-500 outline-none disabled:opacity-30" placeholder="0" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">License Structure</label>
                                    <select {...register('licenseType')} className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 text-white font-bold outline-none ring-1 ring-slate-700 focus:ring-emerald-500">
                                        <option value="regular">Regular License</option>
                                        <option value="extended">Extended License</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Regular (৳)</label>
                                        <input type="number" {...register('regularLicensePrice')} className="w-full bg-slate-800/50 border-b border-slate-700 py-2 px-2 text-lg font-black text-white focus:border-emerald-500 outline-none" placeholder="0" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block tracking-widest">Extended (৳)</label>
                                        <input type="number" {...register('extendedLicensePrice')} className="w-full bg-slate-800/50 border-b border-slate-700 py-2 px-2 text-lg font-black text-white focus:border-emerald-500 outline-none" placeholder="0" />
                                    </div>
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-4 bg-slate-800/40 border border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all active:scale-[0.98]">
                                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${watch('isFeatured') ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'}`}>
                                    {watch('isFeatured') && <FiCheck className="text-white" size={12} />}
                                </div>
                                <input type="checkbox" {...register('isFeatured')} className="hidden" />
                                <span className="text-xs font-black uppercase tracking-wider text-slate-300">Boost to Featured</span>
                            </label>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className={cardClass}>
                        <h2 className={sectionTitle}><FiImage /> Visual Assets</h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className={labelClass}>Gallery Links *</label>
                                    <button type="button" onClick={() => imageFields.append('')} className="text-xs font-bold text-emerald-600 hover:underline"><FiPlus className="inline mr-1" /> Add Link</button>
                                </div>
                                <div className="space-y-2">
                                    {imageFields.fields.map((field, idx) => (
                                        <div key={field.id} className="flex gap-2 relative">
                                            <FiLink className="absolute left-3 top-3.5 text-slate-400" size={14} />
                                            <input {...register(`images.${idx}`)} className={`${inputClass} pl-9`} placeholder="https://screenshot-link.jpg" />
                                            {imageFields.fields.length > 1 && (
                                                <button type="button" onClick={() => imageFields.remove(idx)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-all"><FiTrash2 size={16} /></button>
                                            )}
                                        </div>
                                    ))}
                                    {errors.images && <p className="text-rose-500 text-xs font-medium">{errors.images.message}</p>}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                                <div>
                                    <label className={labelClass}>Live View / BeHance URL</label>
                                    <div className="relative">
                                        <FiGlobe className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                        <input {...register('previewUrl')} className={`${inputClass} pl-10`} placeholder="https://..." />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Source Download Link *</label>
                                    <div className="relative">
                                        <FiLink className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                        <input {...register('downloadFile')} className={`${inputClass} pl-10`} placeholder="Cloud storage link..." />
                                    </div>
                                    {errors.downloadFile && <p className="text-rose-500 text-xs font-medium mt-1">{errors.downloadFile.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Documentation Page</label>
                                    <div className="relative">
                                        <FiFileText className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                        <input {...register('documentationUrl')} className={`${inputClass} pl-10`} placeholder="Docs link..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className={cardClass}>
                        <h2 className={sectionTitle}><FiSettings /> Publication</h2>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Listing Status</label>
                                <select {...register('status')} className={inputClass}>
                                    <option value="approved">✅ Live / Approved</option>
                                    <option value="pending">⏳ Pending Review</option>
                                    <option value="draft">📁 Private Draft</option>
                                    <option value="rejected">❌ Rejected</option>
                                </select>
                            </div>
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-3">
                                <FiInfo className="text-emerald-500 mt-0.5 shrink-0" />
                                <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-medium leading-relaxed italic">
                                    Templates marked as "Live" will be instantly visible to all marketplace customers. Make sure all your links are functional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Sub-component for icons that aren't imported by name
function FiBox(props) {
    return <FiPackage {...props} />;
}
