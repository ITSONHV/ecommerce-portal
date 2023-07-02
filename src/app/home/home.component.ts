import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  isLoadComplete = false;
  public listProduct : any ;
  public listProductSales : any;
  public urlImg : string = environment.urlImg;
  public categoryId : any ;
  productBestSalesOwl : OwlOptions;
  productBestSalesOwl2: OwlOptions;
  constructor(private _svc : MainService,private _router: ActivatedRoute,private spinner: NgxSpinnerService, ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getProductPages();  
    this.getProductBestSales();
    this.isLoadComplete = true;

    this.productBestSalesOwl = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      items: 4,
      // center: false,
      // autoWidth: true,
      // autoHeight: true,
      autoplay: true,
      navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
      responsive: {
          0: {
              items: 2,
          },
          400: {
              items: 3,
          },
          760: {
              items: 4,
              
          },
          940: {
              items: 4,
          }
      },
      nav: false,
    }

    this.productBestSalesOwl2  = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      items: 4,
      // center: false,
      // autoWidth: true,
      // autoHeight: true,
      autoplay: true,
      navText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
      responsive: {
          0: {
              items: 2,
          },
          400: {
              items: 3,
          },
          760: {
              items: 4,
              
          },
          940: {
              items: 4,
          }
      },
      nav: false,
    }
  }
  getProductPages()  {this._svc.getProductPages().subscribe(
    (respones: ObjectModel)=>{
      this.listProduct = respones.data;
      console.log(this.listProduct);
      this.spinner.hide();
    },
    (err) =>{
      console.log(err);
      this.spinner.hide();
    }
  );}
  getProductBestSales()  {this._svc.getProductBestSales().subscribe(
    (respones: ObjectModel)=>{
      this.listProductSales = respones.data;
      console.log(this.listProduct);
      this.spinner.hide();
    },
    (err) =>{
      console.log(err);
      this.spinner.hide();
    }
  );
}

@ViewChild('owlTEST') carouselEl: CarouselComponent;
ngAfterViewChecked() {
   console.log(this.carouselEl?.slidesData);
}
}
