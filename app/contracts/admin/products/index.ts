export interface CreateProductInterface {
    title: string;
    price: number;
    category: number;
    description: string,
}

export interface EditProductInterface {
    id: number;
    title: any;
    price: number;
    category: number;
    description: string,
    // body: string,
}