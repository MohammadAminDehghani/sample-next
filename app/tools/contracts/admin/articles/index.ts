export interface StoreArticleInterface {
    // id: string;
    title: string;
    slug: string;
    body: string;
    tags: string[] | null;
    category: string | null;
}

export interface EditArticleInterface {
    id: string;
    title: string;
    slug: string;
    body: string;
    tags: string[] | null;
    category: string | null;
}