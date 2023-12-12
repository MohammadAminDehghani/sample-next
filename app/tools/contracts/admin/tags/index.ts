export interface StoreTagInterface {
    id: string;
    user: string;
    title: string;
    slug: string;
    body: string;
    image: object;
    tags: string | null;
    viewCount: number;
    commentCount: number;
    categories: string[];
    path?: string;
}

export interface EditTagInterface {
    id: string;
    user: string;
    title: string;
    slug: string;
    body: string;
    image: object;
    tags: string | null;
    viewCount: number;
    commentCount: number;
    categories: string[];
    path?: string;
}