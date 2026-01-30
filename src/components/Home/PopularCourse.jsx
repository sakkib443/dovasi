"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuFactory,
  LuActivity,
  LuHardHat,
  LuSmartphone,
  LuWrench,
  LuTruck
} from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const PopularCourse = () => {
  const { t } = useLanguage();

  const industries = [
    {
      title: t("services.industries.garments"),
      description: t("services.industries.garmentsDesc"),
      icon: LuFactory,
      stats: "500+ Projects"
    },
    {
      title: t("services.industries.construction"),
      description: t("services.industries.constructionDesc"),
      icon: LuHardHat,
      stats: "200+ Projects"
    },
    {
      title: t("services.industries.electronics"),
      description: t("services.industries.electronicsDesc"),
      icon: LuSmartphone,
      stats: "150+ Projects"
    },
    {
      title: t("services.industries.machinery"),
      description: t("services.industries.machineryDesc"),
      icon: LuWrench,
      stats: "300+ Projects"
    },
    {
      title: t("services.industries.logistics"),
      description: t("services.industries.logisticsDesc"),
      icon: LuTruck,
      stats: "400+ Projects"
    },
    {
      title: t("services.industries.health"),
      description: t("services.industries.healthDesc"),
      icon: LuActivity,
      stats: "100+ Projects"
    }
  ];

  return (
    <section className="py-20 bg-maroon">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full border border-primary/20 mb-4"
          >
            {t("services.industries.badge")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-white max-w-3xl"
          >
            {t("services.industries.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-maroon-dark/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <item.icon className="w-8 h-8 text-primary group-hover:text-maroon transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs font-bold text-primary tracking-widest uppercase">{item.stats}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary text-lg">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourse;
