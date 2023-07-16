import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';


@Component({
  selector: 'app-product-recent',
  templateUrl: './product-recent.component.html',
  styleUrls: ['./product-recent.component.css']
})
export class ProductRecentComponent implements OnInit {
  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items:6,
    dots: false,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay: false,
    navSpeed: 700,
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
        items: 45
      }
    },
    nav: false
  };
  public productRecents : any;
  public urlImg : string = environment.urlImg;
  
  constructor(private _svc : MainService,private _router: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document ,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    ) {
  }
  ngOnInit(): void {
    debugger;
   this.productRecents = this._svc.getProductRecent();
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

}
