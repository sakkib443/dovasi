"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        // Lock scroll during loading
        document.body.style.overflow = "hidden";

        // Counter animation
        const timer = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                document.body.style.overflow = "auto";
            }, 1000);
        }
    }, [isLoading]);

    const slideUp = {
        initial: { y: 0 },
        exit: {
            y: "-100vh",
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
        }
    };

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.05 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    variants={slideUp}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-maroon"
                >
                    <div className="flex flex-col items-center justify-center z-10 w-full px-4 text-white">

                        {/* Title - DOVASI */}
                        <motion.div
                            style={{ overflow: "hidden", display: "flex" }}
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-8xl font-black mb-6 tracking-[1.5rem] md:tracking-[2.5rem] text-primary"
                        >
                            {Array.from("DOVASI").map((letter, index) => (
                                <motion.span key={index} variants={child} className="inline-block relative">
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Counter Section */}
                        <div className="flex items-center gap-3 relative mt-4">
                            <span className="text-sm font-bold tracking-[0.4em] uppercase opacity-50">Translation Excellence</span>
                            <div className="w-px h-8 bg-white/20 mx-4"></div>
                            <h2 className="text-3xl md:text-5xl font-bold font-mono text-primary">
                                {percent}%
                            </h2>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-48 md:w-80 h-[2px] bg-white/10 rounded-full mt-12 overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
