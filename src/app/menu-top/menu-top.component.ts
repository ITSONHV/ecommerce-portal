import { Component, ElementRef, OnInit } from '@angular/core';
import { MainService } from 'src/services/main.service';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { ICategory } from 'src/interfaces/ICategory';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { ProductGridComponent } from '../product-grid/product-grid.component';
@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  public productGrComponent: ProductGridComponent;
  public isHidden = false;
  public menuObject: any;
  public subMenu: any;
  comment: string = "";
  public rootMenu: any;
  public allMenu: Array<ICategory> = [];
  constructor(private _mainsvc: MainService, private router: Router, private activatedRoute: ActivatedRoute,public elementRef: ElementRef) {
  }
  hasChild = (_: number, node: any) =>
    !!node.categoryName && node.categoryName.length > 0;

  ngOnInit(): void {
    this.getMenu();
    this.setShowDefaultMenu();
  }

  getMenu() {
    this._mainsvc.getCategories().subscribe(
      (data: any) => {
        console.log(data);

        this.menuObject = { ...data }.data;
        this.rootMenu = this.menuObject.filter((item: any) => {
          return item.categoryParent == 0 || item.categoryParent == null
        });
        this.subMenu = this.menuObject.filter((item: any) => {
          return (item.categoryParent != 0 && item.categoryParent != null)
        });
        this.rootMenu.forEach((element: ICategory) => {
          let subMenuObject = element;
          subMenuObject.submenu = this.subMenu.filter((item: any) => {
            return item.categoryParent == element.id;
          })
          this.allMenu.push(subMenuObject);
        });
      }
    )
  }
  listMenu(data: any, id: any): any {
    var hash = this.arr2hash(data, id);
    return this.hash2tree(hash, 0);
  };
  arr2hash(data: any, id: any): any {
    var hash = new Array;
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
  setShowDefaultMenu(): void{
    if(this.checkRouterHome()){
      let elem: HTMLElement = document.getElementById('mega-menu-category') as HTMLElement;
    }
  }
  toggleHandle(event: any): void {
    let focusElement: HTMLElement = document.getElementById('mega-menu-category') as HTMLElement;
    if (focusElement.style.display) {
      focusElement.style.display = 'block !important'
    }
    else if(this.checkRouterHome()) {
      focusElement.style.display = 'block !important'
    }
    else {
      focusElement.style.display = 'none !important'
    }
  }
  handleMenu(event: any, category: any): void {
    const queryParams: Params = { slug: category.urlSlug };
    this._mainsvc.categoryName = category.categoryName;
    this.router.navigate(
      ['danh-muc-san-pham-g'],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }
  checkRouterHome(): boolean {
    if(this.router.url != "/")
      return false;
    return true;
  }
}
