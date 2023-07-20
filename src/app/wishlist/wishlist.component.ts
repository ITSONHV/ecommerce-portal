import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ICart } from 'src/interfaces/ICart';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  public itemsFavorite = this._svc.getItemsFavorite();
  public totalMoneyItemsFavorite = this._svc.totalMoney;
  public urlImg: string = environment.urlImg;

  constructor( private router: Router,
    public _svc : MainService,
    private meta: Meta,
    private _routerActive: ActivatedRoute,
    private titleService: Title
    ){   
  }
 
  handleViewDetailProduct(event: any, product: any): void {
    this.meta.updateTag({ name: 'description', content: product.seoDescription ?? ""});
    this.titleService.setTitle(product.seoTitle ?? "");
    this.meta.updateTag({ name: 'keywords', content: product.seoKeyword ?? ""});
    const queryParams: Params = { slug: product.productNameSlug };
    this.router.navigate(
      ['/chi-tiet'],
      {
        relativeTo: this._routerActive,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }
  
  removeItemFavorite(productId: number)
  {
      this._svc.removeItemFavorite(productId);
  }

  addToShopingCard(cart: ICart): void{
    this._svc.addToCartWithCart(cart, 1);
    //console.log(this._svc.getItemsCart);
  }
}
