


export default interface Category {
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