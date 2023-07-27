import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICart } from 'src/interfaces/ICart';
import { ObjectModel, ResponseBase } from 'src/models/object_paging.model';
import { PaymentModel, ProductOrderRequest } from 'src/models/payment.model';
import { EncryptService } from 'src/services/encrypt.service';
import { MainService } from 'src/services/main.service';
import { PaymentService } from 'src/services/payment.service';
import { SwalService, TYPE } from 'src/services/swal.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listBanks: any;
  cartsPayment: ICart[] = [];
  /* info*/
  infoCustomer: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  infoShippingCustomer: FormGroup = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    note: new FormControl(''),
  });
  useInfoCustomer = false;
  submitted = false;

  constructor(
    private _svc: MainService,
    private spinner: NgxSpinnerService,
    // private meta: Meta,
    // private _routerActive: ActivatedRoute,
    // private router: Router,
    private titleService: Title,
    private _swal: SwalService,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private _svcPayment: PaymentService,
    private _encryptSvc: EncryptService
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle('Thanh toán');
    this.verifyDataPayment();
    this.getListBanking();
    this.initForm();
  }

  getListBanking() {
    this._svc.getListBanking().subscribe(
      (respones: ObjectModel) => {
        this.listBanks = respones.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showDetailProduct(event: any, idDiv: any) {
    const idIner = 'detail' + idDiv;
    const idInerItem = 'detailItem' + idDiv;
    debugger;
    const tag = this.document.getElementById(idIner);
    const tagItem = this.document.getElementById(idInerItem);
    if (tag?.className === 'fa fa-angle-down') {
      tag.className = 'fa fa-angle-right';
      if (tagItem != null && tagItem != undefined) {
        tagItem.style.display = 'none';
      }
    } else {
      if (tag) {
        tag.className = 'fa fa-angle-down';
        if (tagItem != null && tagItem != undefined) {
          tagItem.style.display = 'block';
        }
      }
    }

    event.preventDefault();
  }

  initForm() {
    this.infoCustomer = this.fb.group(
      {
        name: ['',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100)
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
            Validators.email
          ]
        ],
        phone: ['',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(250),
          ]
        ],
        address: ['',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(250)
          ]]
      },
    );

    this.infoShippingCustomer = this.fb.group(
      {
        name: ['',
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(100)
          ]
        ],

        phone: ['',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(250),
          ]
        ],
        address: ['',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(250)
          ]],
        note: ['',
          [
            Validators.maxLength(250)
          ]]
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.infoCustomer.controls;
  }
  get fship(): { [key: string]: AbstractControl } {
    return this.infoShippingCustomer.controls;
  }
  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.useInfoCustomer) {
      if (this.infoCustomer.invalid) {
        return;
      }
    }
    else {
      if (this.infoCustomer.invalid || this.infoShippingCustomer.invalid) {
        return;
      }
    }
    this.createPayment();
  }

  createPayment(){
    let paymentModel: PaymentModel;
    let productReqs : ProductOrderRequest[] = [];
      this.cartsPayment.map(item => {

        let proReqItem : ProductOrderRequest= {
          ProductID : item.id,
          Quantity : item.quantity
        };
        productReqs.push(proReqItem);
      });
 debugger;
    if(this.useInfoCustomer){
      paymentModel = {
        CustomerPhone: this.f['phone'].value,
        CustomerAddress: this.f['address'].value,
        CustomerEmail: this.f['email'].value,
        CustomerName: this.f['name'].value,
        ShippingAddress: this.f['address'].value,
        ShippingName: this.f['name'].value,
        ShippingPhone: this.f['phone'].value,
        PaymentType : 1,
        Note : '',
        ProductOrderRequests : productReqs
      };
    } else {
      paymentModel = {
        CustomerPhone: this.f['phone'].value,
        CustomerAddress: this.f['address'].value,
        CustomerEmail: this.f['email'].value,
        CustomerName: this.f['name'].value,
        ShippingAddress: this.fship['address'].value,
        ShippingName: this.fship['name'].value,
        ShippingPhone: this.fship['phone'].value,
        PaymentType : 1,
        Note : '',
        ProductOrderRequests : productReqs
      };
    }
  }

  useInforCustomerToShipping(event: any) {
    this.useInfoCustomer = !this.useInfoCustomer;
    const tag = this.document.getElementById('info-shipping-address-child');
    if (this.useInfoCustomer) {
      if (tag != null) {
        tag.style.display = 'none';
      }
    } else {
      if (tag != null) {
        tag.style.display = 'block';
      }
    }

    event.preventDefault();
  }

  getItemCart() {
    return this._svc.getItemsCart();
  }

  verifyDataPayment() {
    this.spinner.show();
    let itemsCart = this._svc.getItemsCart();
    var listIds = itemsCart.map(item => {
      return item.id;
    });

    this._svcPayment.verifyDataPayment(this._encryptSvc.encrypt(JSON.stringify({ ProductIds: listIds }))).subscribe(
      (result: ResponseBase) => {
        if (result == null || result.statusCode != 200) {
          // this._swal.toast(TYPE.ERROR, "Đã có lỗi xảy ra, bạn vui lòng thử lại!.", false);;
        } else {
          for (var val of result.data) {
            const cartItem = itemsCart.find(item => item.id == val.id)
            if (cartItem && cartItem !== undefined) {

              var cartAdd: ICart;
              cartAdd = {
                id: val.id,
                productName: val.productName,
                price: val.promotionPrice,
                image: cartItem.image,
                quantity: cartItem.quantity,
                productNameSlug: val.productNameSlug,
                content: encodeURIComponent(val.content)
              }
              this.cartsPayment.push(cartAdd);
            }
          }
          this.spinner.hide();
          this._svc.clearItemsCart(this.cartsPayment);
          if (result.data.length != itemsCart.length) {
            this._swal.toast(TYPE.SUCCESS, "Thông tin giỏ hàng đã có sự thay đổi!.", false);
          }
        }
      }
    );
  }

  sumPriceItemsInCartPayment(): number {
    return this.cartsPayment.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  sumItemsInCartPayment(): number {
    return this.cartsPayment.reduce((sum, item) => sum + item.quantity, 0);
  }

  decodeURIComponent(content: string): string {
    return decodeURIComponent(content);
  }
}
