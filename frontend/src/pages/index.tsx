import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    return (
        <div>
            <h1>Bienvenido a la PLibraryX</h1>
            <p>Está logueado</p>
        </div>
    );
};

export default Home;
