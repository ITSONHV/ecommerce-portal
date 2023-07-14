import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjectModel } from 'src/models/object_paging.model';
import { MainService } from 'src/services/main.service';
import { PaginatedResponse, PaginationValue } from '../pagination/pagination.component';
import { FormControl } from '@angular/forms';
import { ProductModel } from 'src/models/product.model';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public pagination : PaginationValue = { page: 1, pageSize: 9};
  public paginationControl = new FormControl(this.pagination);
  public listProduct : any = [] ;
  public urlImg : string = environment.urlImg;
  public urlSlug : any ;
  public categoryName: any ;
  public groupSearch: any;
  public category: any;
  public totalRecords = 0;
  public minPrice = 0;
  public maxPrice = 0;
  public searchKey = '';
  public sortValue = 1;
  public selectedPageSize = 9;
    public selectedPriceIndex : any;
  public selectedTextIndex : any;
  isLoadComplete = false;
  public visibleItems: PaginatedResponse<ProductModel> = {
    items: this.listProduct,
    total: this. totalRecords,
  };
  constructor(private _svc : MainService,private _router: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document ,
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
      // else if(localStorage.getItem('product-by-category-slug')?.length != 0){
      //   this.listProduct = JSON.parse(localStorage.getItem('product-by-category-slug') ?? "");
      // }
      else{
        this.onPageChange(this.pagination);
        this.getGroupSearch(0); // get mặc định all
      }

      this.paginationControl.valueChanges.subscribe(x => {
        this.onPageChange(x);
         // console.log('aa' + x);
       });
    });   
  }
  getProductPages()  {
    this._svc.getProductPages().subscribe(
      (respones: ObjectModel)=>{
        this.listProduct = respones.data;
         this.isLoadComplete = true;  
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
         this.isLoadComplete = true;
      },
      (err) =>{
        console.log(err);
      }
    );
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

  counterRate(i: number) {
    return new Array(i);
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

  initGroupSearch(event: any, filterId: any): void {
    const body = this.document.body;
    if (body.classList.contains('block-filter')) {
      body.classList.add('filter-header-noactive');
    } else {
      // body.classList.add('mmPushBody');
    }
    event.preventDefault();
  }

  public onPageChange(pagination: any): void {
    let currentPage = (pagination.page ?? 1);
    this._svc.getProductListPagings(currentPage,
      pagination.pageSize,
      this.searchKey,
      this.minPrice ?? 0,
      this.maxPrice ?? 0,
      this.urlSlug,
      this.sortValue).subscribe(
        (respones: ApiPagingResponse<PagingModel>) => {
        
          this.totalRecords = respones.data.total;
          this.listProduct = respones.data.data;
          this.visibleItems = { items: respones.data.data, total: respones.data.total };
          this.isLoadComplete = true;
          window.scroll(0, 50); // scroll lên 1 tý sau khi change value
        },
        (err) => {
          console.log(err);
        });
  }

  onSelectedPageSize(value: string): void {
		this.selectedPageSize = Number(value); 
    this.pagination.pageSize = this.selectedPageSize;

    this.paginationControl.patchValue(this.pagination);
    this.onPageChange(this.pagination);
	}

  onSelectedSort(value: string): void {
		this.sortValue = Number(value);
    this.onPageChange(this.pagination);
	}

  changeSelectionPrice(event: any, index: string) {
    this.selectedPriceIndex = event.target.checked ? index : undefined;
    debugger;
    if(this.selectedPriceIndex === undefined){
      this.minPrice = 0;
      this.maxPrice = 0;
      this.onPageChange(this.pagination);
    }else{
      let itemSelectd = this.getItemFromGroupSearch(index);
      if(itemSelectd && itemSelectd !== undefined && itemSelectd != null){
        this.minPrice = itemSelectd.minPrice;
        this.maxPrice = itemSelectd.maxPrice;
        this.onPageChange(this.pagination);
      }
    }
    
    event.preventDefault();
  }

  changeSelectionKeySearch(event: any, index: string) {
    this.selectedTextIndex = event.target.checked ? index : undefined;
    if(this.selectedTextIndex === undefined){
      this.searchKey = ''; 
       this.onPageChange(this.pagination);
    }else{
      let itemSelectd = this.getItemFromGroupSearch(index);
      if(itemSelectd && itemSelectd !== undefined && itemSelectd != null){
        this.searchKey = itemSelectd.filterSearchKey;
        this.onPageChange(this.pagination);
      }
    }
  
    event.preventDefault();
  }
  
  getItemFromGroupSearch( index: string){
    let itemSelectd : any = {};
    this.groupSearch.filter ((item: any) =>
    {  
      item.itemFilterValues.filter ((itemChild: any) =>{
        if(itemChild.filterValueID === index)
        { 
          itemSelectd = itemChild;
          return;
        }
      });
      return;
    });
    return itemSelectd;
  }
}
