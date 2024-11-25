import {useState, useContext, useEffect} from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';
import styles from '../styles/auth.module.css';
import Layout from '@/components/main.layout';

const Login = () => {
    // @ts-ignore
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const ctx = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            router.push('/books');
        }
    }, [token, router]);

    if (token) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await ctx?.login(email, password);
            router.push("/books")
        } catch (err: any) {
            setError("Error al iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="PLibraryX - Su librería personal!">
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.title}>Iniciar Sesión</h1>
                    {error && <p className={styles.error}>{error}</p>}
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
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                    <p className={styles.switch}>
                        ¿No tienes una cuenta?{" "}
                        <a
                            onClick={() => router.push("/register")}
                            className={styles.link}
                        >
                            Regístrate aquí
                        </a>
                    </p>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
