"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import {
  LuTarget,
  LuUsers,
  LuBookOpen,
  LuHeart,
  LuRocket,
  LuSparkles,
  LuPlay,
  LuArrowRight,
  LuCheck,
  LuGraduationCap,
  LuTrendingUp,
  LuShield,
  LuStar,
  LuGlobe
} from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import Lenis from 'lenis';

// Floating Element Component
const FloatingElement = ({ children, delay = 0, duration = 3, className = "" }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-8, 8, -8] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stats Counter Component
const StatCard = ({ number, label, icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group text-center"
  >
    <div className="relative inline-flex items-center justify-center w-12 h-12 mb-2 bg-gradient-to-br from-[#E62D26]/10 to-[#F79952]/10 rounded-xl group-hover:scale-110 transition-transform">
      <Icon className="w-5 h-5 text-[#E62D26]" />
    </div>
    <h3 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white outfit">{number}</h3>
    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
  </motion.div>
);

const AboutPage = () => {
  const { language, t } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    }
  }, []);

  const teamMembers = [
    {
      name: "Shohel Rana",
      role: language === 'bn' ? t("aboutPage.founder.designation") : "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      quote: language === 'bn' ? t("aboutPage.founder.quote1") : "Education should be accessible to everyone."
    },
    {
      name: language === 'bn' ? t("aboutPage.team.fatimaName") : "Fatima Ahmed",
      role: language === 'bn' ? t("aboutPage.team.fatimaDesignation") : "Head of Education",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      quote: language === 'bn' ? t("aboutPage.team.fatimaQuote") : "Learning never stops."
    },
    {
      name: language === 'bn' ? t("aboutPage.team.karimName") : "Karim Hassan",
      role: language === 'bn' ? t("aboutPage.team.karimDesignation") : "Tech Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      quote: language === 'bn' ? t("aboutPage.team.karimQuote") : "Technology empowers learning."
    },
  ];

  const values = [
    {
      icon: LuHeart,
      title: language === 'bn' ? t("aboutPage.values.studentFirst") : 'Student First',
      description: language === 'bn' ? t("aboutPage.values.studentFirstDesc") : 'Every decision we make is centered around student success.'
    },
    {
      icon: LuShield,
      title: language === 'bn' ? t("aboutPage.values.qualityContent") : 'Quality Content',
      description: language === 'bn' ? t("aboutPage.values.qualityContentDesc") : 'We ensure all courses meet our high standards.'
    },
    {
      icon: LuGlobe,
      title: language === 'bn' ? t("aboutPage.values.accessibility") : 'Accessibility',
      description: language === 'bn' ? t("aboutPage.values.accessibilityDesc") : 'Making quality education accessible to everyone.'
    },
    {
      icon: LuRocket,
      title: language === 'bn' ? t("aboutPage.values.innovation") : 'Innovation',
      description: language === 'bn' ? t("aboutPage.values.innovationDesc") : 'Constantly evolving with cutting-edge technology.'
    },
  ];

  const milestones = [
    { year: "2020", title: language === 'bn' ? t("aboutPage.history.items.2020.title") : 'HiictPark Founded', description: language === 'bn' ? t("aboutPage.history.items.2020.desc") : 'Started with a vision' },
    { year: "2021", title: language === 'bn' ? t("aboutPage.history.items.2021.title") : '1000+ Students', description: language === 'bn' ? t("aboutPage.history.items.2021.desc") : 'Reached first milestone' },
    { year: "2022", title: language === 'bn' ? t("aboutPage.history.items.2022.title") : '50+ Courses', description: language === 'bn' ? t("aboutPage.history.items.2022.desc") : 'Expanded catalog' },
    { year: "2023", title: language === 'bn' ? t("aboutPage.history.items.2023.title") : 'Global Reach', description: language === 'bn' ? t("aboutPage.history.items.2023.desc") : '20+ countries' },
    { year: "2024", title: language === 'bn' ? t("aboutPage.history.items.2024.title") : 'Industry Partnership', description: language === 'bn' ? t("aboutPage.history.items.2024.desc") : 'Tech partnerships' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0a0a] dark:to-[#0d0d0d]">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-[#E62D26]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-br from-[#F79952]/10 to-transparent rounded-full blur-3xl" />

          {/* Floating Elements */}
          <FloatingElement delay={0} className="absolute top-16 left-[10%] hidden lg:block">
            <div className="w-8 h-8 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-base">🎓</span>
            </div>
          </FloatingElement>
          <FloatingElement delay={0.5} duration={4} className="absolute top-24 right-[15%] hidden lg:block">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E62D26] to-[#F79952] rounded-xl shadow-lg flex items-center justify-center rotate-12">
              <LuSparkles className="text-white text-base" />
            </div>
          </FloatingElement>
          <FloatingElement delay={1} className="absolute bottom-24 left-[20%] hidden lg:block">
            <div className="w-6 h-6 bg-amber-400 rounded-full shadow-lg" />
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-[#E62D26]/20 rounded-full shadow-sm mb-4"
            >
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E62D26] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E62D26]"></span>
              </span>
              <span className={`text-[10px] font-medium text-slate-700 dark:text-slate-300 ${bengaliClass}`}>
                {language === 'bn' ? t("aboutPage.badge") : 'About HiictPark'}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-3 outfit leading-tight ${bengaliClass}`}
            >
              {language === 'bn' ? t("aboutPage.title1") : 'Empowering Minds,'}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62D26] to-[#F79952]">
                {language === 'bn' ? t("aboutPage.title2") : 'Shaping Futures'}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-slate-500 dark:text-slate-400 text-xs lg:text-sm max-w-xl mx-auto mb-8 leading-relaxed ${bengaliClass}`}
            >
              {language === 'bn'
                ? t("aboutPage.subtitle")
                : 'HiictPark is Bangladesh\'s leading e-learning platform dedicated to providing quality education accessible to everyone.'}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 max-w-2xl mx-auto"
            >
              <StatCard number={language === 'bn' ? t("aboutPage.stats.studentsVal") : "5000+"} label={language === 'bn' ? t("aboutPage.stats.students") : 'Students'} icon={LuUsers} delay={0.4} />
              <StatCard number={language === 'bn' ? t("aboutPage.stats.coursesVal") : "50+"} label={language === 'bn' ? t("aboutPage.stats.courses") : 'Courses'} icon={LuBookOpen} delay={0.5} />
              <StatCard number={language === 'bn' ? t("aboutPage.stats.expertsVal") : "20+"} label={language === 'bn' ? t("aboutPage.stats.experts") : 'Instructors'} icon={LuGraduationCap} delay={0.6} />
              <StatCard number={language === 'bn' ? t("aboutPage.stats.successRateVal") : "95%"} label={language === 'bn' ? t("aboutPage.stats.successRate") : 'Success Rate'} icon={LuTrendingUp} delay={0.7} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 lg:py-16 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  alt="Students learning together"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#E62D26] to-[#F79952] rounded-lg flex items-center justify-center">
                      <LuPlay className="text-white ml-0.5 text-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">Watch Our Story</p>
                      <p className="text-[10px] text-slate-500">2 min video</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-[#E62D26]/20 to-[#F79952]/20 rounded-xl -z-10" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -z-10" />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E62D26]/10 rounded-md mb-3">
                <LuTarget className="text-[#E62D26] text-xs" />
                <span className={`text-[10px] font-medium text-[#E62D26] ${bengaliClass}`}>
                  {language === 'bn' ? t("aboutPage.mission.cards.mission") : 'Our Mission'}
                </span>
              </div>

              <h2 className={`text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-3 outfit ${bengaliClass}`}>
                {language === 'bn' ? t("aboutPage.vision.title") : 'Making Quality Education Accessible'}
              </h2>

              <p className={`text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4 ${bengaliClass}`}>
                {language === 'bn'
                  ? t("aboutPage.vision.desc")
                  : 'We are committed to democratizing education by providing high-quality, affordable courses in technology, design, and business skills.'}
              </p>

              <div className="space-y-2 mb-6">
                {(Array.isArray(language === 'bn' ? t("aboutPage.vision.list") : []) ? (language === 'bn' ? t("aboutPage.vision.list") : [
                  'Industry-relevant curriculum',
                  'Expert instructors',
                  'Hands-on projects',
                  'Career support',
                ]) : [
                  'Industry-relevant curriculum',
                  'Expert instructors',
                  'Hands-on projects',
                  'Career support',
                ]).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <LuCheck className="text-emerald-500 text-[10px]" />
                    </div>
                    <span className={`text-xs text-slate-600 dark:text-slate-300 ${bengaliClass}`}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#E62D26] to-[#E62D26] hover:from-[#c41e18] hover:to-[#d42520] text-white text-xs font-semibold rounded-lg shadow-md shadow-[#E62D26]/20 hover:shadow-lg transition-all"
              >
                {language === 'bn' ? t("aboutPage.cta.browse") : 'Explore Courses'}
                <LuArrowRight className="text-sm" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 lg:py-16 bg-slate-50 dark:bg-[#0d0d0d]">
        <div className="container mx-auto px-4 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-md mb-3">
              <HiOutlineSparkles className="text-[#F79952] text-xs" />
              <span className={`text-[10px] font-medium text-slate-600 dark:text-slate-300 ${bengaliClass}`}>
                {language === 'bn' ? t("aboutPage.values.badge") : 'Our Values'}
              </span>
            </div>
            <h2 className={`text-xl lg:text-2xl font-bold text-slate-800 dark:text-white outfit ${bengaliClass}`}>
              {language === 'bn' ? t("aboutPage.values.title") : 'What We Stand For'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-white/5 rounded-xl p-5 border border-slate-100 dark:border-white/10 hover:border-[#E62D26]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#E62D26]/10 to-[#F79952]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <value.icon className="text-[#E62D26] text-lg" />
                </div>
                <h3 className={`text-sm font-bold text-slate-800 dark:text-white mb-1.5 ${bengaliClass}`}>
                  {value.title}
                </h3>
                <p className={`text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed ${bengaliClass}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 lg:py-16 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E62D26]/10 rounded-md mb-3">
              <LuUsers className="text-[#E62D26] text-xs" />
              <span className={`text-[10px] font-medium text-[#E62D26] ${bengaliClass}`}>
                {language === 'bn' ? t("aboutPage.team.badge") : 'Our Team'}
              </span>
            </div>
            <h2 className={`text-xl lg:text-2xl font-bold text-slate-800 dark:text-white outfit mb-2 ${bengaliClass}`}>
              {language === 'bn' ? t("aboutPage.team.title") : 'Meet the Team'}
            </h2>
            <p className={`text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto ${bengaliClass}`}>
              {language === 'bn'
                ? t("aboutPage.team.subtitle")
                : 'Passionate educators and tech enthusiasts dedicated to transforming lives.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E62D26] to-[#F79952] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-white dark:border-slate-800 shadow-md">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className={`text-sm font-bold text-slate-800 dark:text-white ${bengaliClass}`}>{member.name}</h3>
                <p className="text-[10px] text-[#E62D26] font-medium mb-1">{member.role}</p>
                <p className={`text-[10px] text-slate-500 dark:text-slate-400 italic ${bengaliClass}`}>&ldquo;{member.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 lg:py-16 bg-slate-50 dark:bg-[#0d0d0d]">
        <div className="container mx-auto px-4 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-md mb-3">
              <LuRocket className="text-[#E62D26] text-xs" />
              <span className={`text-[10px] font-medium text-slate-600 dark:text-slate-300 ${bengaliClass}`}>
                {language === 'bn' ? t("aboutPage.history.badge") : 'Our Journey'}
              </span>
            </div>
            <h2 className={`text-xl lg:text-2xl font-bold text-slate-800 dark:text-white outfit ${bengaliClass}`}>
              {language === 'bn' ? t("aboutPage.history.title") : 'Milestones Achieved'}
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E62D26] via-[#F79952] to-[#E62D26] md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-3 md:left-1/2 w-2.5 h-2.5 bg-[#E62D26] rounded-full md:-translate-x-1/2 z-10 ring-3 ring-white dark:ring-[#0d0d0d]" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-1.5rem)] ${index % 2 === 0 ? 'md:pr-6 md:text-right' : 'md:pl-6'}`}>
                    <div className="bg-white dark:bg-white/5 rounded-lg p-3 border border-slate-100 dark:border-white/10 shadow-sm">
                      <span className="inline-block px-1.5 py-0.5 bg-[#E62D26]/10 text-[#E62D26] text-[10px] font-bold rounded mb-1">
                        {milestone.year}
                      </span>
                      <h3 className={`text-xs font-bold text-slate-800 dark:text-white mb-0.5 ${bengaliClass}`}>
                        {milestone.title}
                      </h3>
                      <p className={`text-[10px] text-slate-500 dark:text-slate-400 ${bengaliClass}`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#E62D26] to-[#F79952] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-4 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <LuStar className="text-white text-xs" />
              <span className={`text-[10px] font-medium text-white ${bengaliClass}`}>
                {language === 'bn' ? t("aboutPage.cta.badge") : 'Join Us Today'}
              </span>
            </div>

            <h2 className={`text-xl lg:text-2xl font-bold text-white mb-3 outfit ${bengaliClass}`}>
              {language === 'bn' ? t("aboutPage.cta.title") : 'Ready to Start Your Learning Journey?'}
            </h2>
            <p className={`text-white/80 text-xs mb-6 ${bengaliClass}`}>
              {language === 'bn'
                ? t("aboutPage.cta.desc")
                : 'Join thousands of learners who have transformed their careers with HiictPark.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/courses"
                className="px-6 py-2.5 bg-white text-[#E62D26] text-xs font-bold rounded-lg hover:bg-white/90 transition-all shadow-md"
              >
                {language === 'bn' ? t("aboutPage.cta.browse") : 'Browse Courses'}
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/30 hover:bg-white/30 transition-all"
              >
                {language === 'bn' ? t("aboutPage.cta.signUp") : 'Sign Up Free'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
