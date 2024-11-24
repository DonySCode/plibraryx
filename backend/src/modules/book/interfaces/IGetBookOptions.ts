import {UUID} from "crypto";

export interface IGetBookOptions{
    page: number;
    limit: number;
    search?: string;
    author?: string;
    year?: number;
    genre?: string[];
    isFavorite?: boolean;
    userId: UUID;
}
