'use client';

import Footer from '@/components/sheard/Footer';
import Navbar from '@/components/sheard/Navbar';
import TopHeader from '@/components/sheard/TopHeader';
import FloatingCTA from '@/components/sheard/FloatingCTA';
import { AdminEditProvider } from '@/providers/AdminEditProvider';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <AdminEditProvider>
            <div className="flex flex-col min-h-screen">
                <TopHeader />
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <FloatingCTA />
            </div>
        </AdminEditProvider>
    );
};

export default MainLayout;
