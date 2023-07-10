export class CategoryModel {
    id : number;
    categoryName:string;
    categoryParent: number ;
    createdDate: string;
    createdUser : string ;
    sortOrder: number;
    status:number ;
    updatedDate:string ;
    updatedUser:string ;
    seoDescription:string ;
    seoTitle:string ;
    seoKeyword:string ;
    submenu?: CategoryModel[];
  }
    