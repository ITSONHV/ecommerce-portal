import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MainService } from 'src/services/main.service';
import { ICategory } from 'src/interfaces/ICategory';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import 'jquery';
@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit,AfterViewInit {
  public productGrComponent: ProductGridComponent;
  public isHidden = false;
  public menuObject: any;
  public subMenu: any;
  public comment: string = "";
  public rootMenu: any;
  public categoryName = "";
  public allMenu: Array<ICategory> = [
    // {
    //   id : 1,
    //   categoryName:"Menu 1" ,
    //   categoryParent: 0,
    //   createdDate: "" ,
    //   createdUser : "" ,
    //   sortOrder: 0 ,
    //   status:0,
    //   updatedDate:"" ,
    //   updatedUser:"",
    //   submenu: [

    //   ]
    // },
    // {
    //   id : 2,
    //   categoryName:"Menu 2" ,
    //   categoryParent: 0,
    //   createdDate: "" ,
    //   createdUser : "" ,
    //   sortOrder: 0 ,
    //   status:0,
    //   updatedDate:"" ,
    //   updatedUser:"",
    //   submenu: [

    //   ]
    // },
    // {
    //   id : 3,
    //   categoryName:"Menu 3" ,
    //   categoryParent: 0,
    //   createdDate: "" ,
    //   createdUser : "" ,
    //   sortOrder: 0 ,
    //   status:0,
    //   updatedDate:"" ,
    //   updatedUser:"",
    //   submenu: [

    //   ]
    // },
    // {
    //   id : 4,
    //   categoryName:"Menu 4" ,
    //   categoryParent: 0,
    //   createdDate: "" ,
    //   createdUser : "" ,
    //   sortOrder: 0 ,
    //   status:0,
    //   updatedDate:"" ,
    //   updatedUser:"",
    //   submenu: [

    //   ]
    // }
  ];
  constructor(private _mainsvc: MainService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    public elementRef: ElementRef,
    private spinner: NgxSpinnerService,
    ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.categoryName = this._mainsvc.categoryName;
    this.getMenu();
  }
  ngAfterViewInit(): void {
    let elclass = document.getElementsByClassName('mega-menu-category');
    if(this.router.url ==="/"){
      if(elclass.length > 0){
        for (let index = 0; index < elclass.length; index++) {
          const element = elclass[index] as HTMLElement;
          element.setAttribute("style","display: block !important");
        }
      }
    }
    $(this.elementRef.nativeElement).find('.mega-menu-category .nav > li').hover(function() {
      jQuery(this).addClass("active");
      jQuery(this).find('.popup').stop(true, true).fadeIn('slow');},
      function() {
        jQuery(this).removeClass("active");
        jQuery(this).find('.popup').stop(true, true).fadeOut('slow');
    });
  }
  getMenu() {
    this._mainsvc.getCategories().subscribe(
      (data: any) => {
        this.menuObject = { ...data }.data;
        this.allMenu = this.menuObject.filter((item: any) => {
          return item.categoryParent == 0 || item.categoryParent == null
        });
        this.subMenu = this.menuObject.filter((item: any) => {
          return (item.categoryParent != 0 && item.categoryParent != null)
        });
        this.allMenu.forEach((parent: any) => {
          // Lọc ra các phần tử của mảng con có parentId bằng với id của phần tử hiện tại của mảng cha
          let children = this.subMenu.filter((child: any) => child.categoryParent === parent.id);
          // Gán thuộc tính sub bằng giá trị của thuộc tính value của các phần tử con
          parent.submenu = children.map((child: any) => child);
        });
        console.log("menu",this.allMenu);
        this.spinner.hide();
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
