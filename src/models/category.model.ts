export class CategoryModel {
    id : number = 0;
    categoryName:string = "MÀN HÌNH MÁY TÍNH";
    categoryParent: number = 0;
    createdDate: string = "0001-01-01T00:00:00";
    createdUser : string = "";
    sortOrder: number = 0;
    status:number = 0;
    updatedDate:string = "0001-01-01T00:00:00";
    updatedUser:string = "";
    submenu?: CategoryModel[];
  }
    