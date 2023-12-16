export interface StoreCategoryInterface {
    id: string;
    user: string;
    name: string;
    description: string;
    parent: string | null;
}

export interface EditCategoryInterface {
    id: string;
    user: string;
    name: string;
    description: string;
    parent: string | undefined;
}