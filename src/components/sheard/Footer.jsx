"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter, FaPaperPlane } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");

  const quickLinks = [
    { to: "/", label: t("navbar.home") },
    { to: "/about", label: t("navbar.about") },
    { to: "/services", label: t("navbar.services") },
    { to: "/clients", label: t("navbar.clients") },
    { to: "/contact", label: t("navbar.contact") },
  ];

  const services = [
    t("services.onsite"),
    t("services.machinery"),
    t("services.sourcing"),
    t("services.visa"),
    t("services.translation"),
  ];

  return (
    <footer className="bg-maroon-dark text-white border-t border-white/5 relative overflow-hidden">
      {/* Top Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-20 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/">
              <img src="/images/ejobsitlogo.png" alt="Dovasi Logo" className="h-14" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white font-bold italic">Dovasi Co-Operation</span> {t("footer.aboutDesc")}
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-maroon transition-all shadow-lg"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-primary uppercase tracking-widest text-sm">{t("footer.navigation")}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.to} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-primary uppercase tracking-widest text-sm">{t("footer.services")}</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-all" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-bold mb-8 text-primary uppercase tracking-widest text-sm">{t("footer.getUpdates")}</h4>
              <div className="relative group">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="w-full bg-maroon border border-white/10 rounded-xl py-4 pl-4 pr-12 text-sm text-white focus:border-primary outline-none transition-all shadow-inner"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-maroon hover:bg-white transition-all">
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </div>

            <ul className="space-y-5 pt-4">
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-maroon transition-all shrink-0">
                  <IoCallOutline size={20} />
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-0.5">{t("footer.directLine")}</p>
                  <a href="tel:+8801700630200" className="font-bold text-white hover:text-primary transition-colors">+880 1700-630200</a>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-maroon transition-all shrink-0">
                  <IoMailOutline size={20} />
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-0.5">{t("footer.businessInquiry")}</p>
                  <a href="mailto:eshahadat@gmail.com" className="font-bold text-white hover:text-primary transition-colors break-all">eshahadat@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-gray-500 tracking-widest uppercase">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-10">
            <Link href="/terms" className="hover:text-white transition-colors">{t("footer.terms")}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
