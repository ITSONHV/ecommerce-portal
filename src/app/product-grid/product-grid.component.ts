import { environment } from './../../environments/environment';
import { MainService } from 'src/services/main.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ObjectModel } from 'src/models/object_paging.model';
import Swal from 'sweetalert2';
import { ProductModel } from 'src/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit, AfterViewInit  {
  public listProduct : any = [] ;
  public urlImg : string = environment.urlImg;
  public urlSlug : any ;
  public categoryName: any ;
  totalRecords = 0;
  public minPrice = 0;
  public maxPrice = 0;
  public searchKey = '';
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  constructor(private _svc : MainService,private _router: ActivatedRoute,
    private spinner: NgxSpinnerService, 
    ) {
  }
  ngOnInit(): void {
    this.ngAfterViewInit();
    // this._router.queryParams.subscribe(params => {
    //   this.urlSlug = params['slug'];
    //   this.categoryName = this._svc.categoryName;
    //   if(this.urlSlug != null && this.urlSlug != ""){
    //     this.getProductPagesByCategorySlug(this.urlSlug);
    //   }
    //   else{
    //     this.getProductPages();  
    //   }
    // });
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

  ngAfterViewInit(): void {
    this.pageChange();
    this.initialLoad();
  }
 
  initialLoad(){
    let currentPage = (this.paginator?.pageIndex ?? 0)+1;
    this._svc.getProductListPagings(currentPage,  (this.paginator?.pageSize ?? 10), this.searchKey, this.minPrice, this.maxPrice).subscribe(
    (respones: ApiPagingResponse<PagingModel>)=>{
      debugger;
      this.totalRecords = respones.data.total;
      this.listProduct = respones.data.data;
      this.spinner.hide();
    },
    (err) =>{
      console.log(err);
      this.spinner.hide();
    });
  }
 
  pageChange(){
    this.paginator?.page.pipe(
      switchMap(() => {
        let currentPage = (this.paginator?.pageIndex ?? 0)+1;
        return this._svc.getProductListPagings(currentPage,  (this.paginator?.pageSize ?? 10), this.searchKey, this.minPrice, this.maxPrice);
      }),
      map( result => {
        if(!result){
          return [];
        }
        this.totalRecords = result.data.total;
        return result.data.data;
      })
    )
    .subscribe(data => {
      this.listProduct = data;
    });
  }
}

