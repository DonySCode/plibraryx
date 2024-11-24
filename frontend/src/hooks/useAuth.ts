import { useState, useEffect } from "react";
import {userService} from "@/services/userService"
import axios from "axios";
interface IUser {
    id: string;
    name: string;
    email: string;
    token: string;
}

const useAuth = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await userService.login({ email, password });
            const user = response.data;
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return {
        user,
        login,
        logout,
    };
};

export default useAuth;
