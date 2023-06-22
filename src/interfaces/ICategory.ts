export interface  ICategory {
    id : number;
    categoryName:string ;
    categoryParent: number;
    createdDate: string ;
    createdUser : string ;
    sortOrder: number ;
    status:number;
    updatedDate:string ;
    updatedUser:string;
    submenu?: ICategory[];
  }
    