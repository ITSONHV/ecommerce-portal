import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';
import { SwalService, TYPE } from 'src/services/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
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
  public productsRelate : any;
  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items:6,
    dots: false,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay:true,
    navSpeed: 700,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 2,
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
    private _swal: SwalService,
    private rout: Router,
    private meta: Meta,
    private titleService: Title
 ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.categoryName = this._svc.categoryName;
    this._router.queryParams.subscribe(params => {
      if(!params['slug'])
        this.rout.navigate(['/'])// nếu không lấy được params quay lại home
      this.slug = params['slug'];
      this.getProductbyProductNameSlug(this.slug)
      this._svc.addToCart
    });
    this.getProductSales(6);
  }
  ngAfterViewInit(): void {
    
  }
  getProductbyProductNameSlug(slug : string){
    this._svc.getProductbyProductNameSlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.product = respones.data;
        if(this.product != null){
          this._svc.setProductRecent(this.product);

          this.meta.updateTag({ name: 'description', content: this.product.seoDescription ?? ""});
          this.titleService.setTitle(this.product.seoTitle ?? "");
          this.meta.updateTag({ name: 'keywords', content: this.product.seoKeyword ?? ""});
          
          this.imgfirst = this.product.productImages[0]?.imageUrl??"";
          //this.product.productImages?.shift();
          this.htmlContent = this.product.content;
          this.htmlDescription = this.product.description;
          this.getReviewProducts(this.product.id);
          this.getProductsRelate(this.product.categoryId);
        }
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
  getProductsRelate(categoryId : number){
    this._svc.getProductPagesByCategoryId(categoryId).subscribe(
      (respones: ObjectModel)=>{
        if(respones.hasOwnProperty("data")){
          const products = {...respones.data} as any;  
          this.productsRelate = products.data;
          console.log('rl',this.productsRelate);
        } 
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getProductSales(limit: number){
    this._svc.getProductIsBestSellingPages(limit).subscribe(
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
  handleViewDetailProduct(event: any, product: any): void {
    const queryParams: Params = { slug: product.productNameSlug };
    this.rout.navigate(
      ['/chi-tiet'],
      {
        relativeTo: this._router,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )

    window.scrollTo(0, 20);
    event.preventDefault();
  }
  counterRate(i: number) {
    return new Array(i);
  }
  decreaseQuantity(): void{
    if (!isNaN(this.quantity) && this.quantity > 0) {
      this.quantity--;
    }
    else if(!isNaN(this.quantity) && this.quantity === 0){
      return;
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

  addToShopingCard(product:ProductModel): void{
    if (!isNaN(this.quantity)) {
      debugger;
      
      product.imageUrl = product.productImages[0].imageUrl;
      this._svc.addToCart(product, this.quantity);
      this. showAddCartSuccess();
    }
  }

  changeImageLarge(idImage: number){
    let imageClick : any;
    this.product.productImages.filter ((item: any) =>{
       if(item.id === idImage){
        imageClick =item;
        return;
       }
    });
    if(imageClick && imageClick !== undefined && imageClick != null){
      this.imgfirst = imageClick.imageUrl;
    }
    
  }

  addToFavorite(product:ProductModel): void{
    product.imageUrl = product.productImages[0].imageUrl;
    this._svc.addToFavorite(product);
    this.showAddFavorite()
  }

  showAddCartSuccess(){
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào giỏ hàng.", false);
  }
  showAddFavorite(){
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào yêu thích.", false);
  }
}
