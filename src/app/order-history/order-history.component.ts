import { Component } from '@angular/core';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from 'src/services/payment.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  public listOrder : any = [];
  constructor(private _srvPayment: PaymentService, private spinner : NgxSpinnerService){

  }

  ngOnInit(): void {
   
    
  }

  getOrderByPhone(phone: string){
      this.spinner.show();
      this._srvPayment.getOrderByPhone(phone).subscribe(
        (respones: any)=>{
          this.listOrder = respones.data.data;

          console.log(this.listOrder);
            this.spinner.hide();
        },
        (err) =>{
           this.spinner.hide();
        }
      );
  }

  getNameStatus(status: number){

    switch(status){
      case 1:{
        return "Mới";
      }
      case 2:{
        return "Đang chuẩn bị hàng";
      }
      case 3:{
        return "Đang giao";
      }
      case 4:{
        return "Hoàn thành";
      }
      case 5:{
        return "Đã huỷ";
      }
      default:{
        return "";
      }
    }
  }
}
