import { useEffect, useState, useContext, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import BookModal from '@/components/books.modal';
import { AuthContext } from '@/contexts/AuthContext';
import { bookService } from '@/services/bookService';
import Layout from '@/components/main.layout';
import { Book } from '@/types/IBook';
import styles from '@/styles/book.module.css';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DetailsIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const placeholderImage = '/placeholderbook.svg';

const BooksPage = () => {
    // @ts-ignore
    const { token, logout } = useContext(AuthContext);
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState<{ title?: string; author?: string; year?: number; genre?: string[] }>({});
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [authors, setAuthors] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [genres, setGenres] = useState<string[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalBookId, setModalBookId] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchBooks = async () => {
            setLoading(true);
            try {
                const { rows, count } = await bookService.getBooks(token, page, pageSize, filters);
                setBooks(rows);
                setTotal(count);

                const authorsSet = new Set<string>();
                const yearsSet = new Set<number>();
                const genresSet = new Set<string>();

                rows.forEach(book => {
                    authorsSet.add(book.author);
                    yearsSet.add(book.year);
                    // @ts-ignore
                    book.genre.forEach(genre => genresSet.add(genre));
                });

                setAuthors(Array.from(authorsSet));
                setYears(Array.from(yearsSet).sort());
                setGenres(Array.from(genresSet));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
            setLoading(false);
        };

        fetchBooks();
    }, [token, page, pageSize, filters, router, isModalOpen]);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: name === 'year' ? parseInt(value, 10) : value,
        }));
    };

    const handleGenreChange = (genre: string) => {
        setFilters((prevFilters) => {
            const newGenres = prevFilters.genre ? [...prevFilters.genre] : [];
            if (newGenres.includes(genre)) {
                return {
                    ...prevFilters,
                    genre: newGenres.filter(g => g !== genre),
                };
            } else {
                return {
                    ...prevFilters,
                    genre: [...newGenres, genre],
                };
            }
        });
    };

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setPage(1);
    };

    const toggleFavorite = async (bookId: string, isFavorite: boolean) => {
        try {
            if (isFavorite) {
                await bookService.unmarkAsFavorite(token, bookId);
            } else {
                await bookService.markAsFavorite(token, bookId);
            }
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId ? { ...book, isFavorite: !isFavorite } : book
                )
            );
        } catch (error) {
            console.error('Error en favorito:', error);
        }
    };

    const editBook = (bookId: string) => {
        setModalBookId(bookId);
        setIsModalOpen(true);
    };

    const deleteBook = async (bookId: string) => {
        try {
            await bookService.deleteBook(token, bookId);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        } catch (error) {
            console.error('Error borrando libro:', error);
        }
    };

    const viewDetails = (bookId: string) => {
        setModalBookId(bookId);
        setIsModalOpen(true);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = placeholderImage;
    };

    const handleSave = async (updatedBook: Partial<Book>) => {
        try {
            if (modalBookId) {
                const updated = await bookService.updateBook(token, modalBookId, updatedBook);
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.id === modalBookId ? updated : book
                    )
                );
            } else {
                const newBook = await bookService.addBook(token, {
                    ...updatedBook,
                    genre: updatedBook.genre ?? '',
                    isFavorite: false,
                });
                setBooks((prevBooks) => [newBook, ...prevBooks]);
            }
            closeModal();
        } catch (error) {
            console.error('Error guardando libro:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalBookId(null);
    };

    const openAddBookModal = () => {
        setModalBookId(null);
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    // @ts-ignore
    return (
        <Layout title="Lista de Libros">
            <div className={styles.container}>
                <h1 className={styles.title}>Bienvenido a su PLibraryX</h1>
                <Button onClick={handleLogout} className={styles.logoutButton} variant="contained" color="secondary">
                    Cerrar Sesión
                </Button>
                <div className={styles.filter}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Buscar por título..."
                        value={filters.title || ''}
                        onChange={handleFilterChange}
                        className={styles.searchbar}
                    />
                    <select name="author" value={filters.author || ''} onChange={handleFilterChange} className={styles.select}>
                        <option value="">Todos los autores</option>
                        {authors.map(author => (
                            <option key={author} value={author}>{author}</option>
                        ))}
                    </select>
                    <select name="year" value={filters.year || ''} onChange={handleFilterChange} className={styles.select}>
                        <option value="">Todos los años</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <Button onClick={openAddBookModal} variant="contained" color="primary" startIcon={<AddIcon />}>
                        Agregar Libro
                    </Button>
                </div>
                <Box className={styles.chipContainer}>
                    {genres.map((genre) => (
                        <Chip
                            key={genre}
                            label={genre}
                            clickable
                            color={filters.genre && filters.genre.includes(genre) ? 'primary' : 'default'}
                            onClick={() => handleGenreChange(genre)}
                            className={styles.chip}
                        />
                    ))}
                </Box>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Portada</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Año</th>
                            <th>Género</th>
                            <th>Rating</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        width={50}
                                        height={75}
                                        onError={handleImageError}
                                    />
                                </td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{Array.isArray(book.genre) ? book.genre.join(', ') : book.genre}</td>
                                <td>{book.rating}</td>
                                <td className={styles.actions}>
                                    <Button onClick={() => viewDetails(book.id)} variant="outlined"
                                            startIcon={<DetailsIcon/>}>
                                        Detalles
                                    </Button>
                                    <Button onClick={() => editBook(book.id)} variant="outlined"
                                            startIcon={<EditIcon/>}>
                                        Editar
                                    </Button>
                                    <Button onClick={() => deleteBook(book.id)} variant="outlined"
                                            startIcon={<DeleteIcon/>}>
                                        Eliminar
                                    </Button>
                                    <Button onClick={() => toggleFavorite(book.id, book.isFavorite)} variant="outlined"
                                            startIcon={book.isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}>
                                        {book.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={7} className={styles.pagination}>
                                <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                                    Anterior
                                </Button>
                                <span>Página {page} de {Math.ceil(total / pageSize)}</span>
                                <Button onClick={() => setPage((prev) => prev + 1)} disabled={(page * pageSize) >= total}>
                                    Siguiente
                                </Button>
                                <label>
                                    Tamaño de página:
                                    <select value={pageSize} onChange={handlePageSizeChange} className={styles.select}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                </label>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                )}
                <BookModal token={token} open={isModalOpen} onClose={closeModal} bookId={modalBookId} onSave={handleSave} />
            </div>
        </Layout>
    );
};

export default BooksPage;
