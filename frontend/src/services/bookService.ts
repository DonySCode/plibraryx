import api from './api';
import { Book } from '@/types/IBook';

interface GetBooksResponse {
    rows: Book[];
    count: number;
}

export const bookService = {
    getBooks: async (token: string, page: number, pageSize: number, filters: any): Promise<GetBooksResponse> => {
        const response = await api.get('/books', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page,
                limit: pageSize,
                ...filters,
                genre: filters.genre ? filters.genre.join(',') : undefined,
            },
        });
        return response.data;
    },
    getBookById: async (token: string, bookId: string): Promise<Book> => {
        const response = await api.get(`/books/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
    addBook: async (token: string, bookData: Partial<Book>): Promise<Book> => {
        const bookWithDefaults = {
            ...bookData,
            genre:  bookData.genre ? bookData.genre.split(',') : undefined,
            isFavorite: bookData.isFavorite ?? false,
        };

        const response = await api.post('/books', bookWithDefaults, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
    updateBook: async (token: string, bookId: string, bookData: Partial<Book>): Promise<Book> => {
        const bookWithDefaults = {
            ...bookData,
            genre: typeof bookData.genre === 'string' ? bookData.genre.split(',') : bookData.genre,
        };

        console.log(bookWithDefaults);

        const response = await api.put(`/books/${bookId}`, bookWithDefaults, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
    deleteBook: async (token: string, bookId: string): Promise<void> => {
        await api.delete(`/books/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    markAsFavorite: async (token: string, bookId: string): Promise<void> => {
        await api.patch(`/books/${bookId}/favorite`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    unmarkAsFavorite: async (token: string, bookId: string): Promise<void> => {
        await api.patch(`/books/${bookId}/unfavorite`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
