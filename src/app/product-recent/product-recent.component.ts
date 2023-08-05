import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, AfterViewInit, HostListener, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';
import { SwalService, TYPE } from 'src/services/swal.service';
import { SlickCarouselComponent } from "ngx-slick-carousel";
@Component({
  selector: 'app-product-recent',
  templateUrl: './product-recent.component.html',
  styleUrls: ['./product-recent.component.css']
})
export class ProductRecentComponent implements OnInit, AfterViewInit {
  @ViewChild("slickModal") slickModal: SlickCarouselComponent;
  @Input() listProduct: any;
  isShowQuickView = false;
  @Input() isAutoPlay = false;
  isMobile = true;
  public productSlugToChild: string;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 2,
    "rows": 1,
    "autoplay": false,
    "autoplaySpeed": 5000,
    // "mobileFirst": true,
    // "centerMode": true,
    "pauseOnFocus": true,
    "pauseOnHover": true,
    "swipeToSlide": false,
    // "variableWidth": false,
    // "enableCenterMode": true,
    "arrows": true,
    "slidesPerRow": 1,
    "responsive": [
      // {
      //   "breakpoint": 1024,
      //   "settings": {
      //     "slidesToShow":2,
      //     "slidesToScroll": 2,
      //     "slidesPerRow": 1,

      //      "rows": 2,
      //     "autoplay": false,
      //     "pauseOnFocus": true,
      //     "pauseOnHover": true,
      //     "swipeToSlide": false,
      //     "arrows": true,
      //   },
      // },
    ],
  };

  slideConfigMobile = {
    "slidesToShow": 2,
    "slidesToScroll": 2,
    "rows": 2,
    "autoplay": false,
    "autoplaySpeed": 5000,
    // "mobileFirst": true,
    // "centerMode": true,
    "pauseOnFocus": true,
    "pauseOnHover": true,
    "swipeToSlide": false,
    // "variableWidth": false,
    // "enableCenterMode": true,
    "arrows": true,
    "slidesPerRow": 1,
    "responsive": [

    ],
  };
  constructor(private _svc: MainService, private _router: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private _swal: SwalService, )
     {
    this.getScreenSize();
  }


  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    // do cònfig éo được nên đang làm củ chuối vãi ra
    if (this.slickModal !== undefined) {
      if (window.innerWidth <= 1024) {
        if (this.slickModal.config.rows == 1) {
          console.log(this.slickModal.config.rows);
        this.slickModal.unslick();
        this.slickModal.config = this.slideConfigMobile;
        this.slickModal.initSlick();
        }
      } else {
        if (this.slickModal.config.rows == 2) {
          console.log(this.slickModal.config.rows);
          this.slickModal.unslick();
          this.slickModal.config = this.slideConfig;
          this.slickModal.initSlick();
        }
      }
    }
  }

  ngAfterViewInit(): void {
   
  }

  public productRecents: any;
  public urlImg: string = environment.urlImg;
  public listTagOwlItem: HTMLCollectionOf<Element>;
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 1024;
    if (this.listProduct) {
      this.productRecents = this.listProduct;
    } else {
      this.productRecents = this._svc.getProductRecent();
    }
  }

  handleViewDetailProduct(event: any, product: any): void {
    const queryParams: Params = { slug: product.productNameSlug };
    this.router.navigate(
      ['/chi-tiet'],
      {
        relativeTo: this._router,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }

  counterRate(i: number) {
    return new Array(i);
  }

  openModalQuickView(itemProduct: any) {
    this.productSlugToChild = itemProduct.productNameSlug;
    this.isShowQuickView = !this.isShowQuickView;
  }
  listenEventFromChild(check: boolean): void {
    this.isShowQuickView = check;
  }
  addToShopingCard(product: ProductModel): void {
    this._svc.addToCart(product, 1);
    this.showAddCartSuccess();
  }
  addToFavorite(product: ProductModel): void {
    this._svc.addToFavorite(product);
    this.showAddCartFavorite();
  }
  showAddCartSuccess() {
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào giỏ hàng.", false);
  }
  showAddCartFavorite() {
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào yêu thích.", false);
  }
}
