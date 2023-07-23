import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';
import { SwalService } from 'src/services/swal.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  public urlImg: string = environment.urlImg;
  constructor( private router: Router
    , private activatedRoute: ActivatedRoute,
    public _svc : MainService,
    private meta: Meta,
    private _routerActive: ActivatedRoute,
    private titleService: Title,
    private _swal: SwalService,
    @Inject(DOCUMENT) private document: Document,
    ){   
  }
  getItemCart (){
    return this._svc.getItemsCart();
  }
  sumPriceItemsInCart(): number{
   return this._svc.getItemsCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  sumItemsInCart(): number{
    return  this._svc.getItemsCart().reduce((sum, item) => sum + item.quantity, 0);
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

  clearItemCart()
  {
      this._svc.clearItemsCart();
  }

  addQuantityToShopingCard(productId: number, quantity: number): void{
      this._svc.addQuantityToCart(productId, quantity);
  }

  showDetailProduct(event: any, idDiv: any){
    const idIner = 'detail' + idDiv;
    const idInerItem = 'detailItem' + idDiv;
    debugger;
    const tag = this.document.getElementById(idIner);
    const tagItem = this.document.getElementById(idInerItem);
    if (tag?.className === 'fa fa-angle-down') {
      tag.className = 'fa fa-angle-right';
      if(tagItem != null && tagItem != undefined){
        tagItem.style.display = 'none';
      }
    } else {
      if(tag){
        tag.className = 'fa fa-angle-down';
        if(tagItem != null && tagItem != undefined){
          tagItem.style.display = 'block';
        }
      }
    }

    event.preventDefault();
  }

  decodeURIComponent(content: string) : string{
    return decodeURIComponent(content);
  }
}
