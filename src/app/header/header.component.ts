import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public urlImage ="./../assets/images/logo.jpg";
  public searchKey = '';

  constructor( private router: Router
    , private activatedRoute: ActivatedRoute,){
    
  }
  searchFilter(event: any, value: string) {
    this.searchKey = value;
    const queryParams: Params = { searchKey: this.searchKey };
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
}
