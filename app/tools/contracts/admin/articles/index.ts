export interface StoreArticleInterface {
    // id: string;
    title: string;
    slug: string;
    body: string;
    tags: { [key: string]: string; }[];
    category: string | null;
}

export interface EditArticleInterface {
    id: string;
    title: string;
    slug: string;
    body: string;
    tags: any[];
    category: string | null;
}