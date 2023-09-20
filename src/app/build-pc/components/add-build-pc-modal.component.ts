import { Component, Inject, Input, OnDestroy, OnInit ,ViewEncapsulation} from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, finalize, first, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SwalService, TYPE } from 'src/services/swal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaginatedResponse, PaginationValue } from 'src/app/pagination/pagination.component';
import { ProductModel } from 'src/models/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';
import { MainService } from 'src/services/main.service';
import { CommonService } from 'src/services/common.service';


@Component({
  selector: 'app-build-pc-modal',
  templateUrl: './add-build-pc-modal.component.html',
  styleUrls: ['add-build-pc-modal.component.css'],
})
export class AddBuildPCModalComponent implements OnInit, OnDestroy {
  public pagination: PaginationValue = { page: 1, pageSize: 20 };
  public paginationControl = new FormControl(this.pagination);
  isLoading = false;
  subscriptions: Subscription[] = [];
  public fileReview: any;
  public minPrice = 0;
  public maxPrice = 0;
  public searchKey = '';
  searchGroup: FormGroup;
  closemessage = 'closed using directive';
  public urlImg: string = environment.urlImg;
  public listProduct: any = [];
  public totalRecords = 0;
  public visibleItems: PaginatedResponse<ProductModel> = {
    items: this.listProduct,
    total: this.totalRecords,
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<AddBuildPCModalComponent>, private fb: FormBuilder,
    private spinner: NgxSpinnerService, private _svc: MainService, private commonSvc: CommonService
  ) {

  }
  formGroup: FormGroup;
  ngOnInit(): void {
    this.loadForm();
    this.searchForm();
    this.onPageChange(this.pagination);
    this.paginationControl.valueChanges.subscribe(x => {
      this.onPageChange(x);
    });
  }

  loadForm() {
    // Validators.compose([ Validators.minLength(1), Validators.maxLength(200)])

    this.formGroup = this.fb.group({
      // urlTarget: [this.banner.nameBanner, ],
      // nameBanner: [this.banner.nameBanner],
      // position: [this.banner.position],
      // page: [this.banner.page],
      // status: [this.banner.status],
      //    file : new FormControl(''),
      //    imageUrl : new FormControl('', Validators.required)
    });

    this.isLoading = true;
  }

  public onPageChange(pagination: any): void {
    let currentPage = (pagination.page ?? 1);
    this.spinner.show();
    this._svc.getProductListForBuildPC(currentPage,
      pagination.pageSize,
      this.searchKey,
      this.minPrice ?? 0,
      this.maxPrice ?? 0,
      '',
      1,
      '0',
      this.data.code).subscribe(
        (respones: ApiPagingResponse<PagingModel>) => {
          this.totalRecords = respones.data.total;
          this.listProduct = respones.data.data;
          this.visibleItems = { items: respones.data.data, total: respones.data.total };
          this.isLoading = true;
          //window.scroll(0, 50); // scroll lên 1 tý sau khi change value
          this.spinner.hide();
        },
        (err: any) => {
          console.log(err);
          this.spinner.hide();
        });
  }

  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls['searchTerm'].valueChanges
      .pipe(
        /*
  The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
  we are limiting the amount of server requests emitted to a maximum of one every 150ms
  */
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((val) => 
      {
      //  this.search(val)
      let currentPage = 1;
      this._svc.getProductListForBuildPC(currentPage,
        this.pagination.pageSize,
        val,
        this.minPrice ?? 0,
        this.maxPrice ?? 0,
        '',
        1,
        '0',
        this.data.code).subscribe(
          (respones: ApiPagingResponse<PagingModel>) => {
            this.totalRecords = respones.data.total;
            this.listProduct = respones.data.data;
            this.visibleItems = { items: respones.data.data, total: respones.data.total };
            this.isLoading = true;
            //window.scroll(0, 50); // scroll lên 1 tý sau khi change value
            this.spinner.hide();
          },
          (err: any) => {
            console.log(err);
            this.spinner.hide();
          });
      });
    this.subscriptions.push(searchEvent);
  }

  addToBuildPC(product: ProductModel): void {
    this.commonSvc.addToBuidPC(this.data.code, 1, product);
    //this. showAddCartFavorite();
    this.closepopup();
  }

  closepopup() {
    this.ref.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  // helpers for View
  // isControlValid(controlName: string): boolean {
  //   const control = this.formGroup.controls[controlName];
  //   return control.valid && (control.dirty || control.touched);
  // }

  // isControlInvalid(controlName: string): boolean {
  //   const control = this.formGroup.controls[controlName];
  //   return control.invalid && (control.dirty || control.touched);
  // }

  // controlHasError(validation, controlName): boolean {
  //   const control = this.formGroup.controls[controlName];
  //   return control.hasError(validation) && (control.dirty || control.touched);
  // }

  // isControlTouched(controlName): boolean {
  //   const control = this.formGroup.controls[controlName];
  //   return control.dirty || control.touched;
  // }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  // checkSuccessEditOrAdd(res: any, action : string){
  //   if(res && res.statusCode === 200 && res.errorCode == 0){
  //     this.srvAlter.toast(TYPE.SUCCESS, action + " thành công!", false);

  //   }else{
  //     this.srvAlter.toast(TYPE.ERROR, action + " không thành công!", false);
  //   }
  // };
}
