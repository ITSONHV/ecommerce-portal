import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MainService } from 'src/services/main.service';
import { ICategory } from 'src/interfaces/ICategory';
import { Params, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'jquery';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css'],
  animations: [
    trigger('fadeInOut', [
    state('in', style({ opacity: 1 })),
    state('out', style({ opacity: 0 })),
    transition('out => in', animate('300ms ease-in')),
    transition('in => out', animate('300ms ease-out'))
    ])
  ]
})
export class MenuTopComponent implements OnInit, AfterViewInit {
  public productGrComponent: ProductGridComponent;
  public isHidden = false;
  public menuObject: any;
  public subMenu: any;
  public comment: string = "";
  public rootMenu: any;
  public categoryName = "";
  public isShowMenu = this._mainsvc.isShowMenu;
  public isShowIconMenuMobile = true;
  public allMenu: Array<ICategory> = [];
  @Output() sendEventToParent = new EventEmitter<boolean>();
  constructor(private _mainsvc: MainService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public elementRef: ElementRef,
    private spinner: NgxSpinnerService,
    private meta: Meta,
    private titleService: Title
    ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.categoryName = this._mainsvc.categoryName;
    this.getMenu();
    this.isShowMenu = false;
  }
  ngAfterViewInit(): void {
    this.activatedRoute.url.subscribe(url => console.log(url))
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
          if (children.length > 0)
            parent.submenu = children.map((child: any) => child);
        });
        if (this.allMenu.length > 0) {
          if (localStorage.getItem('allmenu-app')?.length != 0) {
            localStorage.removeItem('allmenu-app');
            localStorage.setItem('allmenu-app', JSON.stringify(this.allMenu));

            localStorage.removeItem('all-menu-search');
            localStorage.setItem('all-menu-search', JSON.stringify(this.menuObject));
          }
          else {
            localStorage.setItem('allmenu-app', JSON.stringify(this.allMenu));

            localStorage.setItem('all-menu-search', JSON.stringify(this.menuObject));

          }
        }
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
    if(this.router.url ==='/')
      this.isShowMenu = true;
    else
      this.isShowMenu = !this.isShowMenu;
  }
  handleMenu(event: any, category: any): void {
    localStorage.removeItem('category-menu-select');
    localStorage.setItem('category-menu-select', JSON.stringify(category));
    const queryParams: Params = { slug: category.urlSlug };
    this.meta.updateTag({ name: 'description', content: category.seoDescription });
    this.titleService.setTitle(category.seoTitle);
    this.meta.updateTag({ name: 'keywords', content: category.seoKeyword });
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
    if (this.router.url != "/")
      return false;
    return true;
  }
  handleClickMenuMobile() {
    this.isShowIconMenuMobile = !this.isShowIconMenuMobile;
    this.sendEventToParent.emit(this.isShowIconMenuMobile);
  }
}
