import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, AfterViewInit, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';
import { SwalService, TYPE } from 'src/services/swal.service';

@Component({
  selector: 'app-product-recent',
  templateUrl: './product-recent.component.html',
  styleUrls: ['./product-recent.component.css']
})
export class ProductRecentComponent implements OnInit, AfterViewInit {
  @Input() listProduct: any;
  isShowQuickView = false;
  @Input() isAutoPlay = false;
  public productSlugToChild: string;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "rows": 1,
    "autoplay": false,
    "autoplaySpeed": 5000,
    "infinity": true,
    // "centerMode": true,
    "pauseOnFocus": true,
    "pauseOnHover": true,
    "swipeToSlide": false,
    // "variableWidth": false,
    // "enableCenterMode": true,
    "arrows": true,
    "slidesPerRow": 4,
    "responsive": [
      {
        "breakpoint": 1024,
        "settings": {
          "infinite": true,
          "arrows": true,
          "centerMode": false,
          "slidesToShow": 2,
          "centerPadding": 0,
          "rows": 2,
          "slidesToScroll": 2,
          "slidesPerRow": 1
        },
      },
      // {
      //   "breakpoint": 768,
      //   "settings": {
      //     "arrows": true,
      //     "centerMode": false,
      //     "slidesToShow": 2,
      //      "centerPadding": 0,"rows": 2,   "slidesToScroll": 1,
      //   },
      // },
      // {
      //   "breakpoint": 480,
      //   "settings": {
      //     "arrows": true,
      //     "centerMode": false,
      //     "slidesToShow": 2, 
      //       "centerPadding": 0,"rows": 2,   "slidesToScroll": 1,
      //   },
      // },
    ],
  };



  slickInit(e: any) {
    console.log('slick initialized');
  }

  ngAfterViewInit(): void {
  }

  public productRecents: any;
  public urlImg: string = environment.urlImg;
  public listTagOwlItem: HTMLCollectionOf<Element>;

  constructor(private _svc: MainService, private _router: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private _swal: SwalService,
  ) {
  }
  ngOnInit(): void {
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
