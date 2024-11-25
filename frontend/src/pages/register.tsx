import { useState } from "react";
import { useRouter } from "next/router";
import { userService } from "@/services/userService";
import styles from "../styles/auth.module.css";

const Register = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await userService.register({ username, email, password });
            router.push("/login");
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Ocurrió un error al registrar el usuario."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>Crear Cuenta</h1>

                {error && <p className={styles.error}>{error}</p>}

                <label htmlFor="name" className={styles.label}>
                    Nombre de usuario
                </label>
                <input
                    type="text"
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    required
                />

                <label htmlFor="email" className={styles.label}>
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />

                <label htmlFor="password" className={styles.label}>
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />

                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Registrando..." : "Crear Cuenta"}
                </button>

                <p className={styles.switch}>
                    ¿Ya tienes una cuenta?{" "}
                    <a
                        onClick={() => router.push("/login")}
                        className={styles.link}
                    >
                        Inicia Sesión
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
