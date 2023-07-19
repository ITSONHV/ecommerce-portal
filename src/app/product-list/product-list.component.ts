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
import { NgxSpinnerService } from 'ngx-spinner';
import { ICart } from 'src/interfaces/ICart';
import { Meta, Title } from '@angular/platform-browser';

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
  public categoryParent: any;
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
  public typeSearch : string;
  public productSale : any;
  public myCart: ICart[];
  public categoryCache: any ;
    public visibleItems: PaginatedResponse<ProductModel> = {
    items: this.listProduct,
    total: this. totalRecords,
  };
  constructor(private _svc : MainService,private _router: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document ,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private meta: Meta,
    private titleService: Title,
    ) {
  }
  ngOnInit(): void {
    this.myCart = this._svc.getItemsCart();
    this._router.queryParams.subscribe(params => {
      this.urlSlug = params['slug'];
      this.searchKey = params['searchKey'];
      this.typeSearch = params['typeStatus'];
      this.categoryName = this._svc.categoryName;
      if(this.urlSlug != null && this.urlSlug != ""){
        this.getCategoryBySlug(this.urlSlug);
        this.onPageChange(this.pagination);
      }
      else{
        this.onPageChange(this.pagination);
        this.getGroupSearch(0); // get mặc định all
      }
      this.getProductSales(2);
      this.paginationControl.valueChanges.subscribe(x => {
        this.onPageChange(x);
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
    this.spinner.show();
    this._svc.getCategoryBySlug(slug).subscribe(
      (respones: ObjectModel)=>{
        this.category = respones.data;
        if(this.categoryCache){
          this.meta.updateTag({ name: 'description', content: this.categoryCache.seoDescription });
          this.titleService.setTitle(this.categoryCache.seoTitle);
          this.meta.updateTag({ name: 'keywords', content: this.categoryCache.seoKeyword });
        }
        if(this.category != null){
          this.meta.updateTag({ name: 'description', content: this.category.seoDescription });
          this.titleService.setTitle(this.category.seoTitle);
          this.meta.updateTag({ name: 'keywords', content: this.category.seoKeyword });
          this.categoryName = this.category.categoryName;
          this.getParentCate(this.category.categoryParent);
          this.getGroupSearch(this.category.id);
        }
        this.spinner.hide();
      },
      (err) =>{
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  getGroupSearch(cateID: number){
    this.spinner.show();
    this._svc.getGroupSerrchByCategoryID(cateID).subscribe(
      (respones: ObjectModel)=>{
        this.groupSearch = respones.data;
        this.spinner.hide();
        // if(this.groupSearch != null && this.groupSearch.length > 0)
        // {
        //   //this.idClassActive = 'body-inner0';
        // }
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
    this.spinner.show();
    this._svc.getProductListPagings(currentPage,
      pagination.pageSize,
      this.searchKey,
      this.minPrice ?? 0,
      this.maxPrice ?? 0,
      this.urlSlug,
      this.sortValue,
      this.typeSearch).subscribe(
        (respones: ApiPagingResponse<PagingModel>) => {
        
          this.totalRecords = respones.data.total;
          this.listProduct = respones.data.data;
          this.visibleItems = { items: respones.data.data, total: respones.data.total };
          this.isLoadComplete = true;
          window.scroll(0, 50); // scroll lên 1 tý sau khi change value
          this.spinner.hide();
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
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

  onChangeSelectedListAndGridProrudct(): void {  
    this.router.navigate(
      ['/danh-muc-san-pham-g'],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: "preserve" 
      }
    )

    this.onPageChange(this.pagination);
	}

  getProductSales(limit: number){
    this._svc.getProductIsBestSellingPages(limit).subscribe(
      (respones: ObjectModel)=>{
        this.productSale = respones.data;    
        this.spinner.hide();
      },
      (err) =>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getParentCate(idCate:number){
    if(localStorage.getItem('allmenu-app')){
      let menuAll :any = JSON.parse(localStorage.getItem('allmenu-app') ?? "");

      let menuParent: any = menuAll.filter((item: any) => {
        return item.id == idCate;
      });
      if(menuParent && menuParent.length > 0)
      {
        this.categoryParent = menuParent[0].categoryName;
      }
    }
  }

  addToShopingCard(product:ProductModel): void{
    this._svc.addToCart(product, 1);
    //console.log(this._svc.getItemsCart);
  }
  sumPriceItemsInCart(){
    return this.myCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  removeItemCart(productId: number)
  {
      this._svc.removeItemCart(productId);
  }
}
