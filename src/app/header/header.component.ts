import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public urlImage ="./../assets/images/logo.jpg";
  public searchKey = '';
  public urlImg: string = environment.urlImg;
  public menuSearch : any;
  public hello = "Đăng Minh Computer chào bạn!";
  //public itemsCart = 
  public itemsFavorite = this._svc.getItemsFavorite();
  public totalMoneyItemsCart = this._svc.totalMoney;
  public isShowSearchMobile = false;
  constructor( private router: Router
    , private activatedRoute: ActivatedRoute,
    public _svc : MainService
    ){   
  }
  ngOnInit(){
    this.loadMenuSearch();
  }

  getItemCart (){
    return this._svc.getItemsCart();
  }

  sumPriceItemsInCart(): number{
    this.totalMoneyItemsCart = this._svc.getItemsCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
    return this.totalMoneyItemsCart;
  }
  sumItemsInCart(): number{
    return this._svc.getItemsCart().reduce((sum, item) => sum + item.quantity, 0);
  }
  searchFilter(event: any, value: string, cateSelect : string) {
    this.searchKey = value;
    let queryParams: Params = { searchKey: this.searchKey };
    if(cateSelect !== undefined && cateSelect != null && cateSelect != '')
    {
      queryParams = { slug: cateSelect, searchKey: this.searchKey };
    }else{
      queryParams = { slug: null, typeStatus : null, searchKey: this.searchKey };
    }

    let viewMode = '';
    this.activatedRoute.queryParams.forEach(params => {
      if(params['viewMode'])
        viewMode = params['viewMode'];
    });
    let page = (viewMode === '' || viewMode ==='grid') ? 'danh-muc-san-pham-g' : 'danh-muc-san-pham-l';

    this.router.navigate(
    [ "" + page+ ""],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }

  sumItemsInFavorite(): number{
    return this.itemsFavorite.reduce((sum, item) => sum + 1, 0);
  }

  loadMenuSearch(){
    if(localStorage.getItem('all-menu-search')){
      this.menuSearch = JSON.parse(localStorage.getItem('all-menu-search') ?? "");
    }
  }

  removeItemCart(productId: number)
  {
      this._svc.removeItemCart(productId);
  }

  showSearchMobile(){
    this.isShowSearchMobile = !this.isShowSearchMobile;
  }
}
