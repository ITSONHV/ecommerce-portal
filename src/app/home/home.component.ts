import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Meta, Title } from '@angular/platform-browser';
import { ProductModel } from 'src/models/product.model';
import { SwalService, TYPE } from 'src/services/swal.service';
import { EncryptService } from 'src/services/encrypt.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None, //apply css cho Body
})
export class HomeComponent implements OnInit {
  isLoadComplete = false;
  isShowQuickView = false;
  public listProductBestSelling: any;
  public urlImg: string = environment.urlImg;
  public baseUrl: string = environment.baseUrl;
  public categoryId: any;
  public listTrademark: any;
  public listProductSales: any;
  public listProductIsNew: any;
  public listProductIsHot: any;
  public allMenu : any;
  public activatedRoute: ActivatedRoute;
  public productSlugToChild: string;
  @Input() modalOpen: boolean;
  @Output() modalClose = new EventEmitter();

  slideConfigProductSales = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "autoplay": false ,
    "autoplaySpeed": 3000,
    "infinity": true,
    "pauseOnFocus": true,
    "speed" : 3000,
    "pauseOnHover": true,
    "swipeToSlide": false,
    // "variableWidth": false,
    // "enableCenterMode": true,
    "arrows": true,
    "responsive": [
      {
        "breakpoint": 768,
        "settings": {
          "arrows": false,
          "centerMode": false,
          "slidesToShow": 2,
           "centerPadding": 0,
        },
      },
      {
        "breakpoint": 480,
        "settings": {
          "arrows": false,
          "centerMode": false,
          "slidesToShow": 2, 
            "centerPadding": 0,
        },
      },
    ],
  };

  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    items:6,
    dots: false,
    margin:10,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay:  false ,
    navSpeed: 1000,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      640: {
        items: 4
      },
      900: {
        items: 4
      },
      1024: {
        items: 4
      }
    },
    nav: false
  };

  public customBestSaleProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items:6,
    dots: false,
    margin:10,
    autoplayTimeout: 4000,
    autoplaySpeed: 3000,
    autoplay:true,
    navSpeed: 3000,
    autoplayHoverPause: true,
    autoWidth:true,
    autoHeight:true,

    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      640: {
        items: 4
      },
      900: {
        items: 4
      },
      1024: {
        items: 4
      }
    },
    nav: false
  };

  public customHotProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 4,
    dots: false,
    margin:10,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    autoplay: false,
    navSpeed: 2000,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      640: {
        items: 4
      },
      900: {
        items: 4
      },
      1024: {
        items: 4
      }
    },
    nav: false
  };

  public customNewProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 4,
    dots: false,
    margin:10,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    autoplay: false,
    navSpeed: 2000,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      640: {
        items: 4
      },
      900: {
        items: 4
      },
      1024: {
        items: 4
      }
    },
    nav: false
  };

  public customBrand: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 8,
    dots: false,
    margin:10,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay: true,
    navSpeed: 2000,
    autoWidth: false,
    autoHeight: false,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      640: {
        items: 5
      },
      900: {
        items: 6
      },
      1024: {
        items: 8
      }
    },
    nav: false
  };
  pathBanner="./../assets/images/sub1.jpg";
  constructor(private _svc: MainService, 
    private spinner: NgxSpinnerService, 
    public elementRef: ElementRef,
    private meta: Meta,
    private _routerActive: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private _swal: SwalService,
    private encryptSvc : EncryptService
    ) {
  }
  ngOnInit(): void {
    this.getProductIsBestSellingPages();
    this.getProductSale();
    this.getProductIsHot();
    this.getProductIsNew();
    this.getTrademark();
    if (localStorage.getItem("allmenu-app") !== null &&
      localStorage.getItem("allmenu-app")?.length != 0) {
      this.allMenu = JSON.parse(localStorage.getItem('allmenu-app') ?? "");
    } else {
      console.log("dasdas");
      this.allMenu = this.getMenu();
    }

    this.isLoadComplete = true;
  }
  getProductIsBestSellingPages() {
    this.spinner.show();
    this._svc.getProductIsBestSellingPages(6).subscribe(
      (respones: ObjectModel) => {
        this.listProductBestSelling = respones.data;
      this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getTrademark() {
    this.spinner.show();
    this._svc.getTrademarkLimit(25).subscribe(
      (respones: ObjectModel) => {
        this.listTrademark = respones.data;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
       this.spinner.hide();
      }
    );
  }
  getProductSale() {
    this.spinner.show();
    this._svc.getProductBestDiscountPages().subscribe(
      (respones: ObjectModel) => {
        this.listProductSales = respones.data;
      this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getProductIsHot() {
    this.spinner.show();
    this._svc.getProductIsHotPages().subscribe(
      (respones: ObjectModel) => {
        this.listProductIsHot = respones.data;
      this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getProductIsNew() {
    this.spinner.show();
    this._svc.getProductIsNewPages().subscribe(
      (respones: ObjectModel) => {
        this.listProductIsNew = respones.data;
      this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  counterRate(i: number) {
    return new Array(i);
  }
  handleViewDetailProduct(event: any, product: any): void {
    this.meta.updateTag({ name: 'description', content: product.seoDescription ?? ""});
    this.titleService.setTitle(product.seoTitle ?? "");
    this.meta.updateTag({ name: 'keywords', content: product.seoKeyword ?? ""});
    const queryParams: Params = { slug: product.productNameSlug };
    this.router.navigate(
      ['chi-tiet'],
      {
        relativeTo: this._routerActive,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }
  openModalQuickView(itemProduct: any) {
    this.productSlugToChild = itemProduct.productNameSlug;
    this.isShowQuickView = !this.isShowQuickView;
  }
  listenEventFromChild(check: boolean) : void { 
    this.isShowQuickView = check;
  }
  addToShopingCard(product:ProductModel): void{
    this._svc.addToCart(product, 1);
    this.showAddCartSuccess();
  }

  handleMenu(event: any, category: any): void {
    localStorage.removeItem('category-menu-select');
    localStorage.setItem('category-menu-select', JSON.stringify(category));
    const queryParams: Params = { slug: category.urlSlug };
    this.meta.updateTag({ name: 'description', content: category.seoDescription });
    this.titleService.setTitle(category.seoTitle);
    this.meta.updateTag({ name: 'keywords', content: category.seoKeyword });
    this._svc.categoryName = category.categoryName;
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

  addToFavorite(product:ProductModel): void{
    this._svc.addToFavorite(product);
    this.showAddCartFavorite();
  }

  getMenu() {
    this._svc.getCategories().subscribe(
      (data: any) => {
        let menuObject :any = { ...data }.data;
        this.allMenu = menuObject.filter((item: any) => {
          return item.categoryParent == 0 || item.categoryParent == null
        });
        let subMenu :any= menuObject.filter((item: any) => {
          return (item.categoryParent != 0 && item.categoryParent != null)
        });
        this.allMenu.forEach((parent: any) => {
          // Lọc ra các phần tử của mảng con có parentId bằng với id của phần tử hiện tại của mảng cha
          let children = subMenu.filter((child: any) => child.categoryParent === parent.id);
          // Gán thuộc tính sub bằng giá trị của thuộc tính value của các phần tử con
          if (children.length > 0)
            parent.submenu = children.map((child: any) => child);
        });
        if (this.allMenu.length > 0) {
          if (localStorage.getItem('allmenu-app')?.length != 0) {
            localStorage.removeItem('allmenu-app');
            localStorage.setItem('allmenu-app', JSON.stringify(this.allMenu));

            localStorage.removeItem('all-menu-search');
            localStorage.setItem('all-menu-search', JSON.stringify(menuObject));
          }
          else {
            localStorage.setItem('allmenu-app', JSON.stringify(this.allMenu));

            localStorage.setItem('all-menu-search', JSON.stringify(menuObject));

          }
        }
        this.spinner.hide();
      }
    )
  }

  showAddCartSuccess(){
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào giỏ hàng.", false);
  }
  showAddCartFavorite(){
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào yêu thích.", false);
  }
}
