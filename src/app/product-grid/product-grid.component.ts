import { environment } from './../../environments/environment';
import { MainService } from 'src/services/main.service';
import { Component, OnInit } from '@angular/core';
import { ObjectModel } from 'src/models/object_paging.model';
import Swal from 'sweetalert2';
import { ProductModel } from 'src/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  public listProduct : any = [] ;
  public urlImg : string = environment.urlImg;
  public urlSlug : any ;
  public categoryName: any ;
  constructor(private _svc : MainService,private _router: ActivatedRoute,
    private spinner: NgxSpinnerService, 
    ) {
  }
  ngOnInit(): void {
    this._router.queryParams.subscribe(params => {
      this.urlSlug = params['slug'];
      this.categoryName = this._svc.categoryName;
      if(this.urlSlug != null && this.urlSlug != ""){
        this.getProductPagesByCategorySlug(this.urlSlug);
      }
      else{
        this.getProductPages();  
      }
    });
  }
  getProductPages()  {
    this.spinner.show();
    this._svc.getProductPages().subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  getProductPagesbyCategoryId(categoryId : number){
    this.spinner.show();
    this._svc.getProductPagesByCategoryId(categoryId).subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  getProductPagesByCategorySlug(slug : string){
    this.spinner.show();
    this._svc.getProductPagesByCategorySlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  
  counterRate(i: number) {
    return new Array(i);
  }
}

