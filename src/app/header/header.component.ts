import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public urlImage ="./../assets/images/logo.jpg";
  public searchKey = '';
  public menuSearch : any;
  public hello = "Đăng Minh Computer chào bạn!";
  constructor( private router: Router
    , private activatedRoute: ActivatedRoute,
    public _svc : MainService
    ){   
  }

  ngOnInit(){
    this.loadMenuSearch();
  }

  searchFilter(event: any, value: string, cateSelect : string) {
    this.searchKey = value;
    let queryParams: Params = { searchKey: this.searchKey };
    if(cateSelect !== undefined && cateSelect != null && cateSelect != '')
    {
      queryParams = { slug: cateSelect, searchKey: this.searchKey };
    }

    this.router.navigate(
      ['danh-muc-san-pham-g'],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }

  loadMenuSearch(){
    if(localStorage.getItem('all-menu-search')){
      this.menuSearch = JSON.parse(localStorage.getItem('all-menu-search') ?? "");
    }
  }
}
