"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaWeixin,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaGlobe,
  FaUser,
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaLanguage,
  FaCheckCircle,
  FaDownload
} from "react-icons/fa";

const CVSection = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-md p-6 lg:p-8 h-full"
  >
    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <Icon size={16} />
      </div>
      <h2 className="text-base lg:text-lg font-bold text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 mb-3">
    <span className="text-primary text-[9px] font-bold uppercase tracking-widest opacity-50">{label}</span>
    <span className="text-white/80 text-xs font-normal leading-relaxed">{value}</span>
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-maroon pt-16 pb-20 overflow-hidden font-sans">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-20 max-w-6xl">
        {/* 1. Profile Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-10">
          {/* Intro Block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-white/5 border border-white/5 rounded-md p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-3 block">Expert Chinese Interpreter</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Shahadat <span className="text-primary italic">Hossain</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mb-8 font-normal">
              Professional <span className="text-white font-medium underline decoration-primary/40 decoration-1 underline-offset-4">Chinese Interpreter</span> based in Bangladesh. Specialized in providing linguistic bridge for industrial projects, factory installations, and global sourcing with over a decade of hands-on experience.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-white/5">
              <div className="space-y-3">
                <a href="mailto:eshahadat@gmail.com" className="flex items-center gap-3 text-white/50 hover:text-white transition-all text-xs group">
                  <FaEnvelope className="text-primary/70 group-hover:text-primary" />
                  <span className="font-normal">eshahadat@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <FaPhoneAlt className="text-primary/70" />
                  <span className="font-normal">+880 1700630200</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <FaWhatsapp className="text-[#25D366]/70" />
                  <span className="font-normal">WhatsApp: +880 1700630200</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <FaWeixin className="text-[#07C160]/70" />
                  <span className="font-normal">WeChat: DulaMia</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4"
          >
            <div className="relative h-full min-h-[350px] rounded-md overflow-hidden border border-white/10 shadow-xl">
              <img
                src="/images/image.png"
                alt="Shahadat Hossain"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* 2. Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* Main Sections */}
          <div className="lg:col-span-8 space-y-6">
            <CVSection title="Professional Experience" icon={FaBriefcase}>
              <div className="space-y-8">
                <div className="relative pl-6 border-l border-primary/20">
                  <div className="absolute w-2.5 h-2.5 bg-primary rounded-full left-[-5.5px] top-1" />
                  <span className="text-primary font-bold text-[9px] uppercase tracking-widest block mb-1">2013 — Present</span>
                  <h3 className="text-sm lg:text-base font-bold text-white mb-2">Freelance Chinese Interpreter</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4 font-normal">
                    Executive level technical interpretation for large-scale projects.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4">
                    {[
                      'Industrial Machine Setup',
                      'Power Plant Infrastructure',
                      'Production QC Training',
                      'Factory Audits & Visits',
                      'Supply Chain Logistics',
                      'Trade Negotiation'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/40 text-[11px] font-normal">
                        <div className="w-1 h-1 bg-primary/40 rounded-full" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative pl-6 border-l border-white/5">
                  <div className="absolute w-2.5 h-2.5 bg-white/10 rounded-full left-[-5.5px] top-1" />
                  <span className="text-white/30 font-bold text-[9px] uppercase tracking-widest block mb-1">2011 — 2012</span>
                  <h3 className="text-sm lg:text-base font-bold text-white mb-1">Project Coordinator</h3>
                  <p className="text-white/40 text-xs font-normal italic">Tastan Exports, Dhaka</p>
                </div>
              </div>
            </CVSection>

            <div className="grid md:grid-cols-2 gap-6">
              <CVSection title="Language Mastery" icon={FaLanguage}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <span className="text-white/80 text-xs font-normal">Chinese</span>
                    <span className="text-primary text-[10px] font-bold uppercase">Fluent</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <span className="text-white/80 text-xs font-normal">English</span>
                    <span className="text-white/40 text-[10px] font-bold uppercase">Proficient</span>
                  </div>
                  <p className="text-[10px] text-white/30 mt-2 font-normal italic">*Lived in Shenzhen, China (2008-2013)</p>
                </div>
              </CVSection>

              <CVSection title="Availability" icon={FaCalendarAlt}>
                <div className="flex flex-col h-full justify-between">
                  <p className="text-white/60 text-xs leading-relaxed font-normal mb-4">
                    Available for onsite audits, technical meetings, and factory commissions across Bangladesh on short notice.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <FaCheckCircle className="animate-pulse" />
                    <span>Accepting Projects</span>
                  </div>
                </div>
              </CVSection>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <CVSection title="Background" icon={FaUser}>
              <div className="grid grid-cols-1 gap-1">
                <InfoItem label="Name" value="Shahadat Hossain" />
                <InfoItem label="DOB" value="14 July 1974" />
                <InfoItem label="Nationality" value="Bangladeshi" />
                <InfoItem label="Address" value="Uttara, Dhaka (1230)" />
              </div>
            </CVSection>

            <CVSection title="Education" icon={FaGraduationCap}>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-bold text-[12px]">Bachelor of Arts</h4>
                  <p className="text-white/40 text-[10px] font-normal">National University, 1994</p>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div>
                  <h4 className="text-white font-bold text-[12px]">Technical: Electrical</h4>
                  <p className="text-white/40 text-[10px] font-normal">TTC Mirpur, 1990-91</p>
                </div>
              </div>
            </CVSection>

            <CVSection title="Connect" icon={FaGlobe}>
              <div className="grid grid-cols-4 gap-3">
                {[FaGlobe, FaLinkedinIn, FaFacebookF, FaTwitter].map((Icon, i) => (
                  <a key={i} href="#" className="aspect-square bg-white/5 rounded-xl flex items-center justify-center text-white/30 hover:text-primary hover:border-primary/30 border border-white/5 transition-all">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </CVSection>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-primary text-maroon rounded-md font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/10"
            >
              <FaDownload size={12} />
              Download Resume
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
