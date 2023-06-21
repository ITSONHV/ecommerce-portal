import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/services/main.service';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { CategoryModel } from 'src/models/category.model';
@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  treeControl = new NestedTreeControl<any>((node) => node.sub_menu);
  dataSource = new MatTreeNestedDataSource<CategoryModel>();
  public isHidden = false;
  public menuObject : any;
  public subMenu : any;
  comment: string = "";
  public rootMenu : any;
  public allMenu : Array<CategoryModel> = [];

  constructor(private _mainsvc: MainService){
  }
  hasChild = (_: number, node: any) =>
    !!node.categoryName && node.categoryName.length > 0;

  ngOnInit(): void {
    document.getElementById('sample_id')?.setAttribute('style', "block"); 
    this.getMenu();
  }
  
 getMenu(){
  this._mainsvc.getCategories().subscribe(
    (data: any) => {
      this.menuObject = {... data}.data;
      this.rootMenu = this.menuObject.filter((item: any)=>{
        return item.categoryParent == 0 || item.categoryParent ==  null
      });
      this.subMenu = this.menuObject.filter((item: any)=>{
        return (item.categoryParent != 0 && item.categoryParent !=  null)
      });
      this.rootMenu.forEach((element: any) => {
        let subMenuObject  = new CategoryModel() ;
        subMenuObject.id = element.id;
        subMenuObject.categoryName = element.categoryName
        subMenuObject.categoryParent = element.categoryParent;
        subMenuObject.createdDate = element.createdDate;
        subMenuObject.createdUser = element.createdUser;
        subMenuObject.sortOrder = element.sortOrder;
        subMenuObject.status = element.status;
        subMenuObject.updatedDate = element.updatedDate;
        subMenuObject.updatedUser = element.updatedUser;
        subMenuObject.submenu = this.subMenu.filter((item: any) => {
          return item.categoryParent == element.id;
        })
        this.allMenu.push(subMenuObject);
      });
      //this.dataSource.data = this.listMenu(data.data,0);
      console.log(this.menuObject);
      console.log(this.subMenu );
      console.log(this.allMenu );
    }
  )
  
 }

 listMenu(data : any, id: any) : any{
    var hash = this.arr2hash(data, id);
    return this.hash2tree(hash, 0);
 };
arr2hash(data: any, id: any): any {
  var hash = new Array ;
  for (var i = 0; i < data.length; i++) {
      var pid = data[i].categoryParent;
      if (!hash[pid]) hash[pid] = [];
      hash[pid].push(data[i]);
  }
  return hash;
};
 hash2tree(hash: any, level: any): any {
    var top = hash[level];
    for (var i = 0; i < top.length; i++) {
        var branch = top[i].id;
        if (hash[branch])
            top[i].sub_menu = this.hash2tree(hash, branch);
    }
    return top;
};
  toggleHandle(): void{
    debugger
    this.isHidden = true;
  }
}
