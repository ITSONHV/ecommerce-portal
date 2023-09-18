import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/services/common.service';
import { MainService } from 'src/services/main.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddBuildPCModalComponent } from './components/add-build-pc-modal.component';
import { IBuildPC } from 'src/interfaces/IBuildPC';
import { ICart } from 'src/interfaces/ICart';
@Component({
  selector: 'app-build-pc',
  templateUrl: './build-pc.component.html',
  styleUrls: ['./build-pc.component.css']
})
export class BuildPCComponent {
  listIdBuildPC: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  public urlImg: string = environment.urlImg;
  buildPC: IBuildPC[] = [];
  constructor(private _svc: MainService, private router: Router
    , private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private _commonService: CommonService,
    private dialog: MatDialog,
    private commonSvc: CommonService
  ) {

  }

  showChooseProduct(code: any, name: string) {
    this.Openpopup(code, name, AddBuildPCModalComponent);
  }

  Openpopup(code: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: 'auto',
      height: 'auto',
      minHeight: '800px',
      minWidth: '800px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        code: code
      },

    });
    _popup.afterClosed().subscribe(item => {
      this.buildPC = this._commonService.getBuildPCFromLocalStorage();
    })
  }

  ngOnInit(): void {
    this.buildPC = this._commonService.getBuildPCFromLocalStorage();
  }

  getItemBuildPC(id: number): any {
    return this.buildPC.find(item => item.id == id);
  }
  sumPriceItemsInBuildPC(): number {
    return this._commonService.getBuildPCFromLocalStorage().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItemBuildPC(id: number) {
    return this._commonService.removeItemBuildPC(id);
  }

  clearItemBuildPC() {
    this._commonService.clearItemBuildPC([]);
    this.buildPC = this._commonService.getBuildPCFromLocalStorage();
  }

  onChangeQuantityItemBuildPC(code :number, event: any){
    debugger;
    this.commonSvc.addQuantiyuBuidPC(code, event.target.value);
  }

  addItemBuildToCard() {
    this.buildPC.forEach(element => {
      var card : ICart ={
        content : element.content,
        id : element.productid,
        image : element.image,
        price : element.promotionPrice,
        quantity : element.quantity,
        productNameSlug : element.productNameSlug,
        productName : element.productName
      }
      this._svc.addToCartWithCart(card,element.quantity);
    });

    this.router.navigate(
      ['/gio-hang'],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge'
      }
    )
  }

  redirecUrl(event: any, cate: string, searchKey: string) {
    this._commonService.redirectRouter(event, searchKey, cate);
  }

  redirectRouterDetailProduct(event: any, searchKey: string) {
    this._commonService.redirectRouterDetailProduct(event, searchKey);
  }

  getNameBuidPC(id: number): string {
    switch (id) {
      case 1:
        return "Chọn Mainboard";
      case 2:
        return "Chọn CPU";
      case 3:
        return "Chọn Ram";
      case 4:
        return "Ổ cứng SSD";
      case 5:
        return "Ổ cứng HDD";
      case 6:
        return "PSU - Nguồn máy tính";
      case 7:
        return "VGA - Card màn hình";
      case 8:
        return "Case - Thùng máy";
      case 9:
        return "Màn hình máy tính";
      case 10:
        return "Tản nhiệt CPU";
      case 11:
        return "Bàn phím máy tính";
      case 12:
        return "Chuột máy tính";
      case 13:
        return "Tai nghe";
      case 14:
        return "Fan Case";
      default: {
        return "";
      }
    }
  }
}
