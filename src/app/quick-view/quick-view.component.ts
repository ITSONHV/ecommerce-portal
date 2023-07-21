import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';
import { SwalService, TYPE } from 'src/services/swal.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit, OnDestroy {
  public quantity = 1;
  modalOpen = true;
  public imgfirst : string;
  public product : any;
  public urlImg : string = environment.urlImg;
  @Input() productSlug: string;
  @Output() sendEventToParent = new EventEmitter<boolean>();
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
    private spinner: NgxSpinnerService,
    private _swal: SwalService,
    private route: Router,
 ) {
  }

  ngOnInit(): void {
    this.spinner.show();

    if (!this.productSlug) {
      this.route.navigate(['/'])// nếu không lấy được params quay lại home
      this.spinner.hide();
    }

    this.getProductbyProductNameSlug(this.productSlug);
  }

  getProductbyProductNameSlug(slug : string){
    this._svc.getProductbyProductNameSlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.product = respones.data;
        if(this.product != null){
          // this.meta.updateTag({ name: 'description', content: this.product.seoDescription ?? ""});
          // this.titleService.setTitle(this.product.seoTitle ?? "");
          // this.meta.updateTag({ name: 'keywords', content: this.product.seoKeyword ?? ""});
          
          this.imgfirst = this.product.productImages[0]?.imageUrl??"";
          //this.product.productImages?.shift();
          //console.log(this.product);
          // this.htmlContent = this.product.content;
          // this.htmlDescription = this.product.description;
          // this.getReviewProducts(this.product.id);
          // this.getProductsRelate(this.product.categoryId);
        }
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
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
        'Đóng',
        document.getElementById('#quick_view_popup-overlay')
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
        'Đóng',
        document.getElementById('#quick_view_popup-overlay')
      )
    }
  }
  handleClickCloseModal(event: any,action:boolean) {
    console.log(action);
    this.sendEventToParent.emit (action);
    event.preventDefault();
  } 
  
  addToShopingCard(product:ProductModel): void{
    if (!isNaN(this.quantity)) {
      product.imageUrl = product.productImages[0].imageUrl;
      this._svc.addToCart(product, this.quantity);
      this.showAddCartSuccess();
    }
  }

  counterRate(i: number) {
    return new Array(i);
  }

  ngOnDestroy(): void {
    //this.sendEventToParent.emit(true);
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
