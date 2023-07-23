import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, AfterViewInit, HostListener } from '@angular/core';
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
  // @HostListener('window:resize', ['$event'])
  // onResize(event : any) {

  // }


  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    items:1,
    dots: true,
    // autoplayTimeout: 3000,
    // autoplaySpeed: 100000,
     //autoplay: true,
    navSpeed: 100000,
    merge: true,
    navText: [ '<i class="fa fa-angle-right"></i>',
      '<i class="fa fa-angle-right"></i>',],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2
      },
      640: {
        items: 2
      },
      900: {
        items: 4
      },
      1024: {
        items: 6
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
    // let a =  window.innerWidth;
    // debugger;
    // if(  window.innerWidth < 480){
  
    //   return;
    // }
    var items:any  = this.document.getElementsByClassName('owl-item');
  
    for (let i = 0; i < items.length; i++) {
      let element = items[i];
      element.style.width = 'auto';
    }
  }
}
