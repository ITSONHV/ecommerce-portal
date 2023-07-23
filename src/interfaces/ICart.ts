import { ProductModel } from "src/models/product.model";

export interface ICart {
    id: number;
    price: number;
    productName: string ;
    quantity : number;
    image:string;
    productNameSlug : string;
    content : string;
}

export interface ItemsCart {
    data: ICart[],
    expired: number
}

export interface ItemsFavotire {
    data: ICart[],
    expired: number
}

