import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  public itemsCart = this._svc.getItemsCart();
  public totalMoneyItemsCart = this._svc.totalMoney;
  public urlImg: string = environment.urlImg;
  constructor( private router: Router
    , private activatedRoute: ActivatedRoute,
    public _svc : MainService,
    private meta: Meta,
    private _routerActive: ActivatedRoute,
    private titleService: Title
    ){   
  }
  sumPriceItemsInCart(): number{
    this.totalMoneyItemsCart = this.itemsCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return this.totalMoneyItemsCart;
  }
  sumItemsInCart(): number{
    return this.itemsCart.reduce((sum, item) => sum + item.quantity, 0);
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
  
  removeItemCart(productId: number)
  {
      this._svc.removeItemCart(productId);
  }
  
}
