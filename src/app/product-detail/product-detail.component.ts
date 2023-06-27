import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { ProductModel } from 'src/models/product.model';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public slug: string;
  public product : any;
  public urlImg : string = environment.urlImg;
  public imgfirst : string;
  public categoryName = "";
  constructor(private _svc : MainService,private _router: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.categoryName = this._svc.categoryName;
    this._router.queryParams.subscribe(params => {
      this.slug = params['slug'];
      this.getProductbyProductNameSlug(this.slug)
    });
  }
  getProductbyProductNameSlug(slug : string){
    this._svc.getProductbyProductNameSlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.product = respones.data;
        if(this.product != null)
            this.imgfirst = this.product.productImages[0]?.imageUrl;
        console.log(this.product);
      },
      (err) =>{
        console.log(err);
      }
    );
  }
}
