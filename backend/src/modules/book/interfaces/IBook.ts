export interface IBook {
    id: string;
    title: string;
    author: string;
    year: number;
    genre: string[];
    coverImage?: string;
    rating?: number;
    isFavorite: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
