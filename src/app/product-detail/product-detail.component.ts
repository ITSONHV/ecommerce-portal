import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';
import { SwalService } from 'src/services/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public slug: string;
  public product : any;
  public productSale : any;
  public urlImg : string = environment.urlImg;
  public imgfirst : string;
  public categoryName = "";
  public htmlContent = '';
  public htmlDescription = '';
  public quantity = 1 ;
  public reviewsProducts : any;
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
    navSpeed: 700,
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
  constructor(private _svc : MainService,private _router: ActivatedRoute,
    private spinner: NgxSpinnerService, public sanitizer: DomSanitizer,
    private _swal: SwalService
 ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.categoryName = this._svc.categoryName;
    this._router.queryParams.subscribe(params => {
      debugger
      this.slug = params['slug'];
      this.getProductbyProductNameSlug(this.slug)
    });
    this.getProductSales();
  }
  ngAfterViewInit(): void {
    
  }
  getProductbyProductNameSlug(slug : string){
    this._svc.getProductbyProductNameSlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.product = respones.data;
        if(this.product != null){
          this.imgfirst = this.product.productImages[0]?.imageUrl??"";
          this.product.productImages?.shift();
          this.htmlContent = this.product.content;
          this.htmlDescription = this.product.description;
          this.getReviewProducts(this.product.id);
        }
        console.log(this.product);
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getReviewProducts(productId : number){
    this._svc.getReviewProductLimit(5, productId).subscribe(
      (respones: ObjectModel)=>{
        this.reviewsProducts = respones.data;    
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getProductSales(){
    this._svc.getProductIsBestSellingPages().subscribe(
      (respones: ObjectModel)=>{
        this.productSale = respones.data;    
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  counterRate(i: number) {
    return new Array(i);
  }
  decreaseQuantity(): void{
    if (!isNaN(this.quantity) && this.quantity > 0) {
      this.quantity--;
    }
    else{
      this._swal.Swal(
        'Số lượng không hợp lệ!',
        'Thông báo',
        'warning',
        'Đóng'
      )
    }
  }
  increaseQuantity(): void{
    if (!isNaN(this.quantity)) {
      this.quantity++;
    }
    else{
      this._swal.Swal(
        'Số lượng không hợp lệ!',
        'Thông báo',
        'warning',
        'Đóng'
      )
    }
  }
}
