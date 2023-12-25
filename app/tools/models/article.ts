


export default interface Article {
    id: string;
    user: string;
    title: string;
    slug: string;
    body: string;
    image: object;
    tags: string[] | null;
    viewCount: number;
    commentCount: number;
    category: string | null | undefined;
    path?: string;
}