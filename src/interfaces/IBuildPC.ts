export interface IBuildPC {
    id: number;
    price: number;
    promotionPrice: number;
    productName: string ;
    quantity : number;
    image: string;
    productNameSlug : string;
    productCode : string;
    productid: number;
}

export interface ItemsBuildPC {
    data: IBuildPC[],
    expired: number
}