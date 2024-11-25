import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/books');
    }, [router]);

    return null;
};

export default Home;
