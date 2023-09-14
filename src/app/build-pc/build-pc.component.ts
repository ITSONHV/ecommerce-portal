import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/services/common.service';
import { MainService } from 'src/services/main.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddBuildPCModalComponent } from './components/add-build-pc-modal.component';
@Component({
  selector: 'app-build-pc',
  templateUrl: './build-pc.component.html',
  styleUrls: ['./build-pc.component.css']
})
export class BuildPCComponent {
  allMenu :any;
  public urlImg: string = environment.urlImg;
  constructor(private _svc: MainService,  private router: Router
    , private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private _commonService : CommonService,
    private dialog: MatDialog
    )
  {
    
  }

  showChooseProduct(code: any) {
    this.Openpopup(code, 'Edit Customer', AddBuildPCModalComponent);
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '60%',
      height: '90%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        code: code
      },

    });
    _popup.afterClosed().subscribe(item => {
       console.log("1245")
      //this.loadcustomer();
    })
  }

  ngOnInit(): void {
    this.getChildBuildPC();
  }

  getChildBuildPC() {
    this.spinner.show();
    this._svc.getCategoryChildBySlug('xay-dung-cau-hinh').subscribe(
      (data: any) => {

        let menuObject :any = { ...data }.data;
        this.allMenu = menuObject;
        this.spinner.hide();
      }
    )
  }

  redirecUrl(event: any, cate: string, searchKey: string){
    this._commonService.redirectRouter(event, searchKey, cate);
  }
}
