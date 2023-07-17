import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';


@Component({
  selector: 'app-product-recent',
  templateUrl: './product-recent.component.html',
  styleUrls: ['./product-recent.component.css']
})
export class ProductRecentComponent implements OnInit, AfterViewInit {
  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    items:5,
    margin: 0,
    dots: false,
    stagePadding: 0,
    // autoplayTimeout: 3000,
    // autoplaySpeed: 1000,
    // autoplay: false,
    // navSpeed: 700,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 3
      },
      640: {
        items: 4
      },
      900: {
        items: 5
      },
      1024: {
        items: 5
      }
    },
    nav: false
  };
  public productRecents : any;
  public urlImg : string = environment.urlImg;
  public listTagOwlItem : HTMLCollectionOf<Element>;
  
  constructor(private _svc : MainService,private _router: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document ,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    ) {
  }
  ngOnInit(): void {
   this.productRecents = this._svc.getProductRecent();
   console.log(this.productRecents);
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
  
  ngAfterViewInit(): void {
    debugger;
    var items:any  = this.document.getElementsByClassName('owl-item');

    for (let i = 0; i < items.length; i++) {
      let element = items[i];
      element.style.width = null;
  }
  }

}
