import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/services/main.service';
import { SwalService } from 'src/services/swal.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent {
  public quantity = 1;
  modalOpen = true;
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
    private _swal: SwalService
 ) {
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
