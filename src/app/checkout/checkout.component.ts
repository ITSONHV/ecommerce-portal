import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { SwalService } from 'src/services/swal.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listBanks : any;

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
    note:  new FormControl(''),
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
    ){

  }

  ngOnInit(){
    this.titleService.setTitle('Thanh toán');
    this.getListBanking();
    this.initForm();
  }

  getListBanking() {
    this.spinner.show();
    this._svc.getListBanking().subscribe(
      (respones: ObjectModel) => {
        this.listBanks = respones.data;
      this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  showDetailProduct(event: any, idDiv: any){
    const idIner = 'testCall' + idDiv;
    const idInerItem = 'testCallItem' + idDiv;
    debugger;
    const tag = this.document.getElementById(idIner);
    const tagItem = this.document.getElementById(idInerItem);
    if (tag?.className === 'fa fa-angle-down') {
      tag.className = 'fa fa-angle-right';
      if(tagItem != null && tagItem != undefined){
        tagItem.style.display = 'none';
      }
    } else {
      if(tag){
        tag.className = 'fa fa-angle-down';
        if(tagItem != null && tagItem != undefined){
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

    if(this.useInfoCustomer){
      if (this.infoCustomer.invalid) {
        return;
      }
    }
    else{
      if (this.infoCustomer.invalid || this.infoShippingCustomer.invalid) {
        return;
      }
    }
   
  }

  useInforCustomerToShipping(event: any){
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
}
