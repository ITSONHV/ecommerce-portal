import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public listProduct : any = [] ;
  public urlImg : string = environment.urlImg;
  public urlSlug : any ;
  public categoryName: any ;
  constructor(private _svc : MainService,private _router: ActivatedRoute ) {
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
    this._svc.getProductPages().subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
      },
      (err) =>{
        console.log(err)
      }
    );
  }
  getProductPagesbyCategoryId(categoryId : number){
    this._svc.getProductPagesByCategoryId(categoryId).subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
      },
      (err) =>{
        console.log(err);
      }
    );
  }
  getProductPagesByCategorySlug(slug : string){
    this._svc.getProductPagesByCategorySlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
      },
      (err) =>{
        console.log(err);
      }
    );
  }
}
