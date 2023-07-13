import { environment } from './../../environments/environment';
import { MainService } from 'src/services/main.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ObjectModel } from 'src/models/object_paging.model';
import Swal from 'sweetalert2';
import { ProductModel } from 'src/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';
import { FormControl } from '@angular/forms';
import { PaginationValue } from '../pagination/pagination.component';
import { DOCUMENT } from '@angular/common';


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
  public paginationControl = new FormControl(this.pagination);
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
  public sortValue = 1;
  public selectedPageSize = 9;
  public isLoadComplete = false;

  public visibleItems: PaginatedResponse<ProductModel> = {
    items: this.listProduct,
    total: this. totalRecords,
  };

  constructor(public _svc : MainService,private _router: ActivatedRoute,
    private spinner: NgxSpinnerService, 
    @Inject(DOCUMENT) private document: Document
    ) {
  }
  ngOnInit(): void { 
    this._router.queryParams.subscribe(params => {
      this.urlSlug = params['slug'];
      this.searchKey = params['searchKey'];
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

  counterRate(i: number) {
    return new Array(i);
  }

  //pagination: PaginationValue
  public onPageChange(pagination: any): void {
    this.spinner.show();
    let currentPage = (pagination.page ?? 1);
    this._svc.getProductListPagings(currentPage,
      pagination.pageSize,
      this.searchKey,
      this.minPrice,
      this.maxPrice,
      this.urlSlug,
      this.sortValue).subscribe(
        (respones: ApiPagingResponse<PagingModel>) => {
          debugger;
          this.totalRecords = respones.data.total;
          this.listProduct = respones.data.data;
          this.visibleItems = { items: respones.data.data, total: respones.data.total };
          this.isLoadComplete = true;
          this.spinner.hide();
          window.scroll(0, 50); // scroll lên 1 tý sau khi change value
        },
        (err) => {
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

  handleClickGroupSearch(event: any, idDiv: any): void {
    const idIner = 'body-inner' + idDiv;
    const tag = this.document.getElementById(idIner);
    if (tag?.classList.contains('noactive')) {
      tag.classList.remove('noactive');
      tag.classList.add('filter-body-inner');
    } else {
      tag?.classList.remove('filter-body-inner');
      tag?.classList.add('noactive');
    }
    event.preventDefault();
  }

  onSelectedPageSize(value: string): void {
		this.selectedPageSize = Number(value); 
    this.pagination.pageSize = this.selectedPageSize;

    this.paginationControl.patchValue(this.pagination);
    this.onPageChange(this.pagination);
	}

  onSelectedSort(value: string): void {
		this.sortValue = Number(value); 
    //this.paginationControl.patchValue(this.pagination);
    this.onPageChange(this.pagination);
	}
}
