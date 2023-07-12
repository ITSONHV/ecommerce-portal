import { environment } from './../../environments/environment';
import { MainService } from 'src/services/main.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ObjectModel } from 'src/models/object_paging.model';
import Swal from 'sweetalert2';
import { ProductModel } from 'src/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';
import { FormControl } from '@angular/forms';
import { PaginationValue } from '../pagination/pagination.component';


export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit  {
  public pagination : PaginationValue = { page: 1, pageSize: 9};
  public readonly paginationControl = new FormControl(this.pagination);
  public listProduct : any = [] ;
  public urlImg : string = environment.urlImg;
  public urlSlug : any ;
  public categoryName: any ;
  public category: any;
  public groupSearch: any;
  public totalRecords = 0;
  public minPrice = 0;
  public maxPrice = 0;
  public searchKey = '';
  public selectedPageSize = 9;
  public isLoadComplete = false;

  public visibleItems: PaginatedResponse<ProductModel> = {
    items: this.listProduct,
    total: this. totalRecords,
  };

  constructor(public _svc : MainService,private _router: ActivatedRoute,
    private spinner: NgxSpinnerService, 
    ) {
  }
  ngOnInit(): void { 
    this._router.queryParams.subscribe(params => {
      this.urlSlug = params['slug'];
      this.categoryName = this._svc.categoryName;
      if(this.urlSlug != null && this.urlSlug != ""){
        this.getCategoryBySlug(this.urlSlug);    
        this.onPageChange(this.pagination);
      }
      else{      
        this.onPageChange(this.pagination);
        this.getGroupSearch(0); // get mặc định all
      }
    });
     this.paginationControl.valueChanges.subscribe(x => {
      this.onPageChange(x);
       // console.log('aa' + x);
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

  counterRate(i: number) {
    return new Array(i);
  }

 //pagination: PaginationValue
  public onPageChange(pagination: any): void {
    this.spinner.show();
    let currentPage = (pagination.page ?? 1);
    this._svc.getProductListPagings(currentPage,  (pagination.pageSize), this.searchKey, this.minPrice, this.maxPrice, this.urlSlug).subscribe(
    (respones: ApiPagingResponse<PagingModel>)=>{
      debugger;
      this.totalRecords = respones.data.total;
      this.listProduct = respones.data.data;
      this.visibleItems = { items: respones.data.data, total: respones.data.total };
      this.isLoadComplete = true;
      this.spinner.hide();
      window.scroll(0, 250); // scroll lên 1 tý sau khi change value
    },
    (err) =>{
      console.log(err);
      this.spinner.hide();
    });
  }

  getCategoryBySlug(slug: string){
    this._svc.getCategoryBySlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.category = respones.data;
        if(this.category != null){  
          this.getGroupSearch(this.category.id);
        }
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  getGroupSearch(cateID: number){
    this._svc.getGroupSerrchByCategoryID(cateID).subscribe(
      (respones: ObjectModel)=>{
        this.groupSearch = respones.data;
        if(this.groupSearch != null && this.groupSearch.length > 0)
        {
          //this.idClassActive = 'body-inner0';
        }
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  onSelectedPageSize(value: string): void {
		this.selectedPageSize = Number(value); 
    this.pagination.pageSize = this.selectedPageSize;
    this.onPageChange(this.pagination);
	}
}
