"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Hero from "@/components/Home/Hero";
import TopCategories from "@/components/Home/TopCategories";
import PopularCourse from "@/components/Home/PopularCourse";
import CaseStudySection from "@/components/Home/CaseStudySection";
import AboutTeamSection from "@/components/Home/AboutTeamSection";
import Testimonials from "@/components/Home/Testimonials";
import ContactSection from "@/components/Home/ContactSection";
import QRCodeSection from "@/components/Home/QRCodeSection";
import CTASection from "@/components/Home/CTASection";
import { fetchCoursesData } from "@/redux/CourseSlice";
import { fetchCategories } from "@/redux/categorySlice";
import Lenis from 'lenis';

const HomePage = () => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize Lenis Smooth Scroll - Only on desktop
    if (window.innerWidth > 768) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      dispatch(fetchCoursesData());
      dispatch(fetchCategories());
    }
  }, [dispatch, mounted]);

  return (
    <div className="relative min-h-screen bg-maroon selection:bg-primary selection:text-maroon font-poppins antialiased overflow-x-hidden">
      <main className="relative">
        <Hero />

        {/* Expertise / Services */}
        <div id="services">
          <TopCategories />
        </div>

        {/* Founder & Team */}
        <div id="about">
          <AboutTeamSection />
        </div>

        {/* Industrial Focus */}
        <PopularCourse />

        {/* Portfolio / Recent Work */}
        <div id="clients">
          <CaseStudySection />
        </div>

        {/* Trust Factors */}
        <div id="testimonials">
          <Testimonials />
        </div>

        {/* Instant Connections / QR */}
        <QRCodeSection />

        {/* Lead Capture */}
        <ContactSection />

        {/* Final CTA Closer */}
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;
