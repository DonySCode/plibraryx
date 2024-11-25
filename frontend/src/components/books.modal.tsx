import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Book } from '@/types/IBook';
import {bookService} from "@/services/bookService";

interface BookModalProps {
    token: string;
    open: boolean;
    onClose: () => void;
    bookId?: string | null;
    onSave: (book: Partial<Book>) => void;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookModal: React.FC<BookModalProps> = ({ token, open, onClose, bookId, onSave }) => {
    const [book, setBook] = useState<Partial<Book>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (bookId) {
            const fetchBook = async () => {
                setIsLoading(true);
                try {
                    const response = await bookService.getBookById(token, bookId);
                    setBook(response);
                } catch (error) {
                    console.error('Error fetching book details:', error);
                }
                setIsLoading(false);
            };
            fetchBook();
        } else {
            setBook({});
        }
    }, [bookId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(book);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={modalStyle}>
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                        <h2 id="modal-title">{bookId ? 'Editar Libro' : 'Agregar Libro'}</h2>
                        <TextField
                            label="Título"
                            name="title"
                            value={book.title || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Autor"
                            name="author"
                            value={book.author || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Año"
                            name="year"
                            value={book.year || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Género"
                            name="genre"
                            value={Array.isArray(book.genre) ? book.genre.join(', ') : book.genre || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Rating"
                            name="rating"
                            value={book.rating || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Imagen de POrtada"
                            name="coverImage"
                            value={book.coverImage || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
                            {bookId ? 'Guardar' : 'Agregar'}
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default BookModal;
