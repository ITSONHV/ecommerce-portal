import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None, //apply css cho Body
})
export class HomeComponent implements OnInit {
  isLoadComplete = false;
  public listProductBestSelling: any;
  public urlImg: string = environment.urlImg;
  public categoryId: any;
  public listTrademark: any;
  public listProductSales: any;
  public listProductIsNew: any;
  public listProductIsHot: any;
  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items:6,
    dots: false,
    margin:10,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay:true,
    navSpeed: 1000,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 1
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
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    autoplay:true,
    navSpeed: 2000,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 1
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
        items: 1
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
        items: 1
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
    items: 4,
    dots: false,
    margin:10,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay: true,
    navSpeed: 2000,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 3
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
        items: 6
      }
    },
    nav: false
  };
  pathBanner="./../assets/images/sub1.jpg";
  constructor(private _svc: MainService, 
    private spinner: NgxSpinnerService, 
    public elementRef: ElementRef,
    private meta: Meta,
    private _router: ActivatedRoute,
    private router: Router,
    private titleService: Title
    ) {
  }
  ngOnInit(): void {
    this.getProductIsBestSellingPages();
    this.getProductSale();
    this. getProductIsHot();
    this.getProductIsNew();
    this.getTrademark();
    this.isLoadComplete = true;
  }
  getProductIsBestSellingPages() {
    this.spinner.show();
    this._svc.getProductIsBestSellingPages().subscribe(
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
    this._svc.getTrademarkLimit(10).subscribe(
      (respones: ObjectModel) => {
        this.listTrademark = respones.data;
        console.log(this.listTrademark);
        
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
    debugger
    this.meta.updateTag({ name: 'description', content: product.seoDescription ?? ""});
    this.titleService.setTitle(product.seoTitle ?? "");
    this.meta.updateTag({ name: 'keywords', content: product.seoKeyword ?? ""});
    const queryParams: Params = { slug: product.productNameSlug };
    this.router.navigate(
      ['chi-tiet'],
      {
        relativeTo: this._router,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }
}
