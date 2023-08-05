import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SafePipe } from './commons/PipeCustom';
import { ScrollTopComponent } from 'src/scroll-top/scrollTop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductRecentComponent } from './product-recent/product-recent.component';
import { FacebookModule } from 'ngx-facebook/facebook.module';
import {CookieService} from 'ngx-cookie-service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    OrderDetailComponent,
    SafePipe,
    ScrollTopComponent,
    PaginationComponent,
    ProductRecentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    GoogleMapsModule
   // FacebookModule.forRoot()

  ],
  providers: [CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
