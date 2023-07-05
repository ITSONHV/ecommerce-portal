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
    active: boolean | undefined;
    urlSlug:string,
    submenu?: ICategory[];
  }
    