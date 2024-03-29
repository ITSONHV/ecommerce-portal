import { Component, HostListener, Inject, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { MainService } from 'src/services/main.service';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { DOCUMENT } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { FacebookService, InitParams } from 'ngx-facebook';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  isShowMenu = false;
  isShowIconMenuChild = false;
  allMenu : any;
  public leftBanner: any;
  public rightlBanner: any;
  public urlImg: string = environment.urlImg;
  public baseUrl: string = environment.baseUrl;
  public pageId = environment.pageId;
  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    // Lấy chiều rộng và chiều cao của cửa sổ
    const width = event.target.innerWidth;
    const height = event.target.innerHeight;
    // Thực hiện các hành động phù hợp
    if(width >= 765 && height >= 722){
      if(this.isShowMenu === true){
        this.isShowMenu = false;
        const body = this.document.body;
        if (body.classList.contains('mmPushBody')) {
          body.classList.remove('mmPushBody');
        } else {
          body.classList.add('mmPushBody');
        }
      }
    }
    else{
      if(this.isShowMenu === true){
        this.isShowMenu = false;
        const body = this.document.body;
        if (body.classList.contains('mmPushBody')) {
          body.classList.remove('mmPushBody');
        } else {
          body.classList.add('mmPushBody');
        }
      }
    }
  }
  cssCloseMenuMobile = {
    'left': '-250px',
    'width': '250px',
    'height': '7786px', 
    'display': 'none', 
    'overflow': 'hidden',
  }
  cssOpenMenuMobile = {
    'left': '0px', 
    'width': '250px', 
    'height': '7786px', 
    'display': 'block', 
    'overflow': 'hidden',
  }
  constructor(private _mainsvc: MainService, private activatedRoute: ActivatedRoute,
    private router: Router, 
    @Inject(DOCUMENT) private document: Document,
    private spinner: NgxSpinnerService,
    private _svc: MainService,
    private facebookService: FacebookService

    ){}
  ngOnInit(): void {
    this.loadMenuToMobile();
    this.getBanners();
    this.initFacebookService();
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //      this.showHeader = this.activatedRoute?.firstChild?.snapshot.data?.['showHeader'] ?? true;
    //   }
    // });
   };

  private initFacebookService(): void {
      const initParams: InitParams = { xfbml:true, version:'v3.2'};
      this.facebookService.init(initParams);
  }

  ngAfterViewInit(): void {
  }
  listenEventFromChild(check: boolean) : void {
    this.isShowMenu = !this.isShowMenu;
    const body = this.document.body;
    if (body.classList.contains('mmPushBody')) {
      body.classList.remove('mmPushBody');
    } else {
      body.classList.add('mmPushBody');
    }
  }
  clickIconShow(itemParen:any) : void {
    itemParen.isExpanded = !itemParen.isExpanded;
      for (let item of this.allMenu) {
        if (item.id !== itemParen.id) {
          item.isExpanded = false;
      }
    }
  }
  loadMenuToMobile():void{
    this.spinner.show();
    if(localStorage.getItem('allmenu-app')){
      this.allMenu = JSON.parse(localStorage.getItem('allmenu-app') ?? "");
    }
    this.spinner.hide();
  }
  handleMenu(event: any, category: any): void {
    const queryParams: Params = { slug: category.urlSlug };
    this._mainsvc.categoryName = category.categoryName;

    // cấu hình pc
    if(category.UrlSlug === 'xay-dung-cau-hinh' || category.id == 1)
    {
      this.router.navigate(
        ['xay-dung-cau-hinh'],
        {
          relativeTo: this.activatedRoute,
          queryParams: null,
          queryParamsHandling: 'merge'
        }
      )
    }else
    {
      this.router.navigate(
        ['danh-muc-san-pham-g'],
        {
          relativeTo: this.activatedRoute,
          queryParams: queryParams,
          queryParamsHandling: 'merge'
        }
      )
    }

    this.listenEventFromChild(true);
    event.preventDefault();
  }

  checkBannerkUrl(url: any) {
    if (url && url != '' && url != 'null' && url != undefined) { return this.baseUrl + url };

    return "danh-muc-san-pham-g?typeStatus=1";
  }

  getBanners(){
    this.spinner.show();
    this._svc.getBanners(4).subscribe(
      (data: any)=>{
        if(data.data.length > 0){

            this._svc.setBannersToLocalStorage(data.data);
            data.data.filter((item : any) => {
            if(item.position.toLowerCase() ==="left"){
              this.leftBanner = item;
            }
            if(item.position.toLowerCase() ==="right"){
              this.rightlBanner = item;
            }
          })
        }
      }
    )
  }

  onActivate(event: any) {
    window.scroll(0, 0);
  }
}
