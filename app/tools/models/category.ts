


export default interface Category {
    id: string;
    user: string;
    name: string;
    description: string;
    parent: string | null;
    parentCategory: Category
}