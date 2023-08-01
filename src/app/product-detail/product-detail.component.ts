import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, NgZone, OnInit ,ViewEncapsulation} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectModel, ResponseBase } from 'src/models/object_paging.model';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';
import { SwalService, TYPE } from 'src/services/swal.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  @HostListener('window:scroll', ['$event']) 
  onScroll(event: any) {  
    var w = window.innerWidth;
    let scrollPosition = window.scrollY * w / 1000;
    if(w > 768)
      this.displayToolbar_bottom = scrollPosition >=  800;
    else if(w > 480)
      this.displayToolbar_bottom = scrollPosition >=  900;
    else if(w <= 480)
      this.displayToolbar_bottom = scrollPosition >=  600;
      
    this.displayToolbar_Top = window.scrollY >= 1000;
    console.log(scrollPosition);
  } 
  displayToolbar_bottom: boolean;
  displayToolbar_Top: boolean;
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

  /* review*/
  reviewForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    content: new FormControl(''),
    phone: new FormControl(''),
    rate: new FormControl('5'),
  });
  submitted = false;

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "infinity": true,
    "centerMode": false,
    "pauseOnFocus": true,
    "pauseOnHover": true,
    "swipeToSlide": true,
    "variableWidth": false,
    "centerPadding": "0px",
    "arrows": true,
    "responsive": [
      {
        "breakpoint": 1024,
        "settings": {
          "arrows": false,
          "centerMode": false,
          "slidesToShow": 2,
           "centerPadding": "0px",
        },
      },
      {
        "breakpoint": 480,
        "settings": {
          "arrows": false,
          "centerMode": false,
          "slidesToShow": 2, 
            "centerPadding": "0px",
        },
      },
    ],
  };

  slickInit(e :any) {
    console.log('slick initialized');
  }
  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    items:6,
    dots: false,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay: false,
    autoWidth: true,
    navSpeed: 700,
    navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
    responsive: {
      0: {
        items: 2,
        autoWidth: true,
      },
      400: {
        items: 3,autoWidth: true,
      },
      640: {
        items: 4,autoWidth: true,
      },
      900: {
        items: 4,autoWidth: true,
      },
      1024: {
        items: 4,autoWidth: true,
      }
    },
    nav: false
  };

  constructor(private _svc : MainService,private _router: ActivatedRoute,
    private spinner: NgxSpinnerService, public sanitizer: DomSanitizer,
    private _swal: SwalService,
    private rout: Router,
    private meta: Meta,
    private titleService: Title,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document 
 ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.categoryName = this._svc.categoryName;
    this._router.queryParams.subscribe(params => {
      if(!params['slug'])
        this.rout.navigate(['/'])// nếu không lấy được params quay lại home
      this.slug = params['slug'];
      this.getProductbyProductNameSlug(this.slug);
    });
    this.getProductSales(6);
    this.initForm();
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
          this.titleService.setTitle(this.product.seoTitle ?? "DMC Store");
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

  initForm() {
    this.reviewForm = this.fb.group(
      {
        name: ['',
          [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
          ]
        ],
        content: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(250)
          ]
        ],
        phone: [''],
        rate: ['5']
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.reviewForm.controls;
  }

  onItemChangeRadio(event: any){
    this.reviewForm.get('rate')?.setValue(event.target.value);
    event.preventDefault();
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.reviewForm.invalid) {
      return;
    }

    var dataReq = {
      productID: this.product.id,
      content:   this.reviewForm.get('content')?.value,
      rate:   this.reviewForm.get('rate')?.value,
      nickname:  this.reviewForm.get('name')?.value,
      phone:  this.reviewForm.get('phone')?.value,
    };
    this._svc.addReviewProduct(JSON.stringify(dataReq)).subscribe(
      (result: ResponseBase)=>{
      
        if (result == null || result.statusCode != 200) {
          this._swal.toast(TYPE.ERROR, "Đã có lỗi xảy ra, bạn vui lòng thử lại!.", false);;
       }else{
   
          this._swal.toast(TYPE.SUCCESS, "Thêm đánh giá thành công.", false);
          this.onReset();
       }
      }
    );
  }


  onReset(): void {
    this.submitted = false;
    this.reviewForm.reset();
  }
}
