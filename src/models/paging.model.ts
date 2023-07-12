import { ProductModel } from "./product.model";

export interface PagingModel {

    data: ProductModel[],
    total:number,
    pageSize: number,
    page: number,
}

export interface ApiPagingResponse<T> {
    hasError: boolean,
    statusCode: number, // Add more possible status responses if needed
    data: T
}