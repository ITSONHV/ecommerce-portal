import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { ProductCompareComponent } from './product-compare/product-compare.component';
import { AccountComponent } from './account/account.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { BuildPCComponent } from './build-pc/build-pc.component';

const routes: Routes = [
  { path: '', 
    component: HomeComponent,
    pathMatch : 'full'
  },
  {
    path: 'tin-tuc',
    component: BlogComponent
  },
  {
    path: 'gioi-thieu',
    component: AboutUsComponent
  },
  {
    path: 'chi-tiet',
    component: ProductDetailComponent
  },
  {
    path: 'xem-nhanh',
    component: QuickViewComponent
  },
  {
    path: 'so-sanh',
    component: ProductCompareComponent
  },
  {
    path: 'nguoi-dung',
    component: AccountComponent
  },
  {
    path: 'danh-sach-yeu-thich',
    component: WishlistComponent
  },
  {
    path: 'gio-hang',
    component: ShoppingCartComponent
  },
  {
    path: 'thanh-toan',
    component: CheckoutComponent
  },
  {
    path: 'dang-ky',
    component: RegisterComponent
  },
  {
    path: 'danh-muc-san-pham-g',
    component: ProductGridComponent
  },
  {
    path: 'danh-muc-san-pham-l',
    component: ProductListComponent
  },
  {
    path: 'lich-su-mua-hang',
    component: OrderHistoryComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
   {
    path: 'xay-dung-cau-hinh',
    component: BuildPCComponent
  },
  // { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
