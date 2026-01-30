"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaMapMarkerAlt,
  FaWeixin,
  FaLinkedinIn,
  FaClock
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";

const ContactContent = () => {
  const searchParams = useSearchParams();
  const serviceFromQuery = searchParams.get('service') || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceFromQuery,
    message: ""
  });

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const text = `Hi Dovasi, I am ${formData.name}. %0AEmail: ${formData.email} %0APhone: ${formData.phone} %0AService: ${formData.service || 'General Inquiry'} %0AMessage: ${formData.message}`;
    window.open(`https://wa.me/8801700630200?text=${text}`, "_blank");
  };

  return (
    <div className="grid lg:grid-cols-12 gap-10 items-start">
      {/* Left: Contact Info */}
      <div className="lg:col-span-5 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 bg-white/5 border border-white/5 rounded-md"
        >
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[9px] mb-4 block">Get In Touch</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Start Your <br /> <span className="text-primary italic">Project</span>
          </h1>
          <p className="text-white/50 text-xs md:text-sm font-normal leading-relaxed mb-10">
            Connect with our experts today. We respond within minutes during business hours via WhatsApp for immediate coordination.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary shrink-0">
                <FaMapMarkerAlt size={16} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Our Location</h4>
                <p className="text-white/40 text-[11px] font-normal leading-relaxed">Room 62, House 09, Road 13, Sector 11, Uttara, Dhaka 1230, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#25D366]/10 rounded-md flex items-center justify-center text-[#25D366] shrink-0">
                <FaWhatsapp size={18} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">WhatsApp & Call</h4>
                <p className="text-white/40 text-[11px] font-normal">+880 1700-630200</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary shrink-0">
                <FaClock size={16} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Business Hours</h4>
                <p className="text-white/40 text-[11px] font-normal">Mon — Sat: 9:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white/5 border border-white/5 rounded-md flex flex-col items-center">
            <FaWeixin className="text-[#07C160] mb-3" size={24} />
            <span className="text-white font-bold text-xs uppercase">DulaMia</span>
            <span className="text-[10px] text-white/30 font-normal">WeChat ID</span>
          </div>
          <div className="p-6 bg-white/5 border border-white/5 rounded-md flex flex-col items-center">
            <FaEnvelope className="text-primary mb-3" size={24} />
            <span className="text-white font-bold text-xs uppercase">Email Us</span>
            <span className="text-[10px] text-white/30 font-normal">eshahadat@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Right: Lead Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-7 bg-white/5 border border-white/5 rounded-md p-8 lg:p-10"
      >
        <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/5 rounded-md py-4 pl-12 pr-4 text-white text-xs placeholder:text-white/10 focus:border-primary outline-none transition-all font-normal"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input
                  type="tel"
                  required
                  placeholder="+880"
                  className="w-full bg-white/5 border border-white/5 rounded-md py-4 pl-12 pr-4 text-white text-xs placeholder:text-white/10 focus:border-primary outline-none transition-all font-normal"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Email Address (Optional)</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/5 rounded-md py-4 pl-12 pr-4 text-white text-xs placeholder:text-white/10 focus:border-primary outline-none transition-all font-normal"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Service Required</label>
            <div className="relative">
              <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
              <select
                className="w-full bg-white/5 border border-white/5 rounded-md py-4 pl-12 pr-4 text-white text-xs focus:border-primary outline-none transition-all appearance-none font-normal"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="" className="bg-maroon">General Inquiry</option>
                <option value="chinese-interpreter" className="bg-maroon">Chinese Interpretation</option>
                <option value="sourcing-agent" className="bg-maroon">Product Sourcing</option>
                <option value="technical-installation" className="bg-maroon">Machinery Installation</option>
                <option value="business-visa" className="bg-maroon">Business Visa Support</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Message</label>
            <textarea
              placeholder="Briefly describe your requirements..."
              rows="5"
              className="w-full bg-white/5 border border-white/5 rounded-md py-4 px-4 text-white text-xs placeholder:text-white/10 focus:border-primary outline-none transition-all font-normal resize-none"
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-maroon hover:bg-white py-5 rounded-md font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/5"
          >
            <FaPaperPlane size={14} />
            Send To WhatsApp
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-maroon pt-16 pb-20 overflow-hidden font-sans">
      <div className="container relative z-10 mx-auto px-4 lg:px-20 max-w-7xl">
        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
          <ContactContent />
        </Suspense>
      </div>
    </div>
  );
};

export default ContactPage;
