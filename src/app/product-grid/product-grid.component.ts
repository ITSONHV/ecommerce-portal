import { environment } from './../../environments/environment';
import { MainService } from 'src/services/main.service';
import { Component, OnInit } from '@angular/core';
import { ObjectModel } from 'src/models/object_paging.model';
import Swal from 'sweetalert2';
import { ProductModel } from 'src/models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  public listProduct : any ;
  public urlImg : string = environment.urlImg;
  public categoryId : any ;
  public categoryName: any ;
  constructor(private _svc : MainService,private _router: ActivatedRoute ) {
  }
  ngOnInit(): void {
    this._router.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      this.categoryName = params.get('categoryName');
    });
    
    if(this.categoryId != null && this.categoryId != 0){
      this.getProductPagesbyCategoryId(this.categoryId);
    }
    else{
      this.getProductPages();  
    }
  }
  getProductPages()  {
    this._svc.getProductPages().subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
      },
      (err) =>{

      }
    );
  }
  getProductPagesbyCategoryId(categoryId : number){
    this._svc.getProductPagesByCategoryId(categoryId).subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
      },
      (err) =>{

      }
    );
  }
}

