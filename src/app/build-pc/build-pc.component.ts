import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/services/common.service';
import { MainService } from 'src/services/main.service';

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
    private _commonService : CommonService
    )
  {
    
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
