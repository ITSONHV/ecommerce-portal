export class ProductModel {
        id:number;
        productCode: string  ;
        productName: string ;
        categoryId: number  ;
        description: string  ;
        partnerID: number  ;
        isNew: number   ;
        isHot: number ;
        viewCount: number  ;
        content: string  ;
        price: number;
        promotionPrice: number;
        video: string ;
        status: number  ;
        seoAlias: string ;
        seoKeyword: string ;
        stock: number;
        imageUrl: string ;
        createdDate: string ;
        updatedDate: string  ;
        updatedUser: string  ;
        createdUser: string  ;
        productNameSlug : string;
        rate : number;
        countRate : number;
        productImages: any;
        productAttributesModel: productAttributesModel[];
}

export class productAttributesModel {
        attributeName: string  ;
        attributeValueName: string ;
        attributeId: number  ;
        attributeValueID: number  ;
        productId: number  ;
}