import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Head from "next/head";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
        <AuthProvider>
            <Head>
                <title>{title}</title>
            </Head>
            <main>{children}</main>
        </AuthProvider>
    );
};

export default Layout;
