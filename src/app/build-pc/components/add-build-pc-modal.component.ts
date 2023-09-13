import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, first, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { environment } from 'src/environments/environment';
import { SwalService, TYPE } from 'src/services/swal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-build-pc-modal',
  templateUrl: './add-build-pc-modal.component.html',
  styleUrls: []
})
export class AddBuildPCModalComponent implements OnInit, OnDestroy {

  isLoading = false;
  subscriptions: Subscription[] = [];
  public fileReview : any;


   inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<AddBuildPCModalComponent>, private fb: FormBuilder,) {

  }
  formGroup: FormGroup;
  ngOnInit(): void {  
    this.loadForm();
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
