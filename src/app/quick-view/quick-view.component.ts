import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { SwalService } from 'src/services/swal.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {
  public quantity = 1;
  modalOpen = true;
  public imgfirst : string;
  @Input() product: any;
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
    this._router.queryParams.subscribe(params => {
      if(!params['pslug'])
      {
        this.route.navigate(['/'])// nếu không lấy được params quay lại home
        this.spinner.hide();
      }
      
      this.getProductbyProductNameSlug(params['pslug']);
    });
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
          this.product.productImages?.shift();
          console.log(this.product);
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
        document.getElementById('quick_view_popup-overlay')
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
        document.getElementById('quick_view_popup-overlay')
      )
    }
  }
  handleClickCloseModal(event:any) {
    this.sendEventToParent.emit(true);
    event.preventDefault();
  }
}
