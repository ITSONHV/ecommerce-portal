import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { SliderComponent } from './slider/slider.component';
import { CategoryComponent } from './category/category.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
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
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { HomeProSaleComponent } from './home/home-pro-sales/home-pro-sale.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeProSaleComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    SliderComponent,
    CategoryComponent,
    MenuTopComponent,
    AboutUsComponent,
    ProductDetailComponent,
    QuickViewComponent,
    ProductCompareComponent,
    AccountComponent,
    WishlistComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    RegisterComponent,
    ProductGridComponent,
    NotFoundComponent,
    ProductListComponent,
    OrderHistoryComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
