import { environment } from './../../environments/environment';
import { MainService } from 'src/services/main.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ObjectModel } from 'src/models/object_paging.model';
import Swal from 'sweetalert2';
import { ProductModel } from 'src/models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PaginatedResponse, PaginationValue } from '../pagination/pagination.component';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICart } from 'src/interfaces/ICart';
import { SwalService, TYPE } from 'src/services/swal.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit  {
  public pagination : PaginationValue = { page: 1, pageSize: 12};
  public paginationControl = new FormControl(this.pagination);
  public listProduct : any = [] ;
  public urlImg : string = environment.urlImg;
  public urlSlug : any ;
  public categoryName: any ;
  public categoryParent: any;
  public category: any;
  public groupSearch: any;
  public totalRecords = 0;
  public minPrice = 0;
  public maxPrice = 0;
  public searchKey = '';
  public sortValue = 1;
  public selectedPageSize = 12;
  public selectedPriceIndex : any;
  public selectedTextIndex : any;
  public isLoadComplete = false;
  public categoryCache: any ;
  public productSale : any;
  public typeSearch : string;
  public form : any;
  public productSlugToChild: string;
  public isShowQuickView: boolean;
  public myCart : ICart[];
  public visibleItems: PaginatedResponse<ProductModel> = {
    items: this.listProduct,
    total: this. totalRecords,
  };

  constructor(private _svc : MainService,public _router: ActivatedRoute,
    private spinner: NgxSpinnerService, 
    @Inject(DOCUMENT) private document: Document,
    private rout: Router,
    private meta: Meta,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private formBuilder: FormBuilder,
    private _swal : SwalService,
    private _commonService : CommonService
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
    });
     this.paginationControl.valueChanges.subscribe(x => {
      this.onPageChange(x);
     });
     this.getProductSales(6);
     this.form = this.formBuilder.group({
      typeStatus: ["", Validators.required],
    })

    this.changeValueTypeSearch(this.typeSearch);
  }

  counterRate(i: number) { 
    return new Array(i);
  }

  //pagination: PaginationValue
  public onPageChange(pagination: any): void {
    this.closeSearchMobile();
    this.spinner.show();
    let currentPage = (pagination.page ?? 1);
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
          this.visibleItems = 
          
          { items: respones.data.data, total: respones.data.total };
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
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getGroupSearch(cateID: number){
    this.spinner.show();
    this._svc.getGroupSerrchByCategoryID(cateID).subscribe(
      (respones: ObjectModel)=>{
        this.groupSearch = respones.data;
          this.spinner.hide();
      },
      (err) =>{
        console.log(err); 
         this.spinner.hide();
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

  onChangeSelectedTypeStatus(value: string): void {
		this.typeSearch = value;
    let queryParams: Params = { typeStatus: this.typeSearch };
      
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )

    this.onPageChange(this.pagination);
	}

  onChangeSelectedListAndGridProrudct(): void {  
    let queryParams: Params = { viewMode: 'list' };
    this.router.navigate(
      ['/danh-muc-san-pham-l'],
      {
        relativeTo: this.activatedRoute,
        queryParams : queryParams,
        queryParamsHandling: "merge" 
      }
    )

    this.onPageChange(this.pagination);
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

  changeValueTypeSearch(value: string){
    if(parseInt(value) > 0){
      this.form.controls.typeStatus.setValue(value);
    } else {
      this.form.controls.typeStatus.setValue("0");
    }
  }

  addToShopingCard(product:ProductModel): void{
    this._svc.addToCart(product, 1);
    this.showAddCartSuccess();
  }

  listenEventFromChild(check: boolean) : void { 
    this.isShowQuickView = check;
  }
  
  openModalQuickView(itemProduct: any) {
    this.productSlugToChild = itemProduct.productNameSlug;
    this.isShowQuickView = !this.isShowQuickView;
  }

  getParentCate(idCate:number){
    if(localStorage.getItem('allmenu-app')){
      let menuAll :any = JSON.parse(localStorage.getItem('allmenu-app') ?? "");

      let menuParent: any = menuAll.filter((item: any) => {
        return item.id == idCate;
      });
      if(menuParent && menuParent.length > 0)
      {
        this.categoryParent = menuParent[0];
      }
    }
  }

  sumPriceItemsInCart(){
    return this.myCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  removeItemCart(productId: number)
  {
      this._svc.removeItemCart(productId);
  }

  addToFavorite(product:ProductModel): void{
    this._svc.addToFavorite(product);
    this.showAddFavorite();
  }
  
  showAddCartSuccess(){
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào giỏ hàng.", false);
  }
  showAddFavorite(){
    this._swal.toast(TYPE.SUCCESS, "Sản phẩm đã được thêm vào yêu thích.", false);
  }

  handleViewDetailProduct(event: any, product: any): void {
    const queryParams: Params = { slug: product.productNameSlug };
    this.router.navigate(
      ['/chi-tiet'],
      {
        relativeTo: this._router,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
    event.preventDefault();
  }

  ngOnDestroy() {
   
  }

  /*bộ lọc mobile*/ 
  closeSearchMobile(): void {
    const tag = this.document.getElementById('searchMobile');
    if (tag) {
      tag.classList.add('searchMobile');
    }
  }
  closeSearchMobileEvent(event: any): void { event.preventDefault();
    const tag = this.document.getElementById('searchMobile');
    if (tag) {
      tag.classList.add('searchMobile');
    }
    console.log('dasdasdsd');
   
    return;
  }
  openSearchMobile(): void {
    const tag = this.document.getElementById('searchMobile');
    if (tag) {
      tag.classList.remove('searchMobile');
    }
    
  }

  handleClickGroupSearchMobile
  (event: any, idDiv: any): void {
    const idIner = 'body-inner-m' + idDiv;
    const idAngle = 'body-inner-m-angle' + idDiv;
  
    const tag = this.document.getElementById(idIner);
    const tagItem = this.document.getElementById(idAngle);
    if (tag?.classList.contains('noactive')) {
      tag.classList.remove('noactive');
      //tag.classList.add('filter-body-inner');
      if (tagItem?.className === 'fa fa-angle-right') {
        tagItem.className = 'fa fa-angle-down';
      } 
    } else {
      //tag?.classList.remove('filter-body-inner');
      tag?.classList.add('noactive');
      if (tagItem?.className === 'fa fa-angle-down') {
        tagItem.className = 'fa fa-angle-right';
      }
    }
    event.preventDefault();
  }

  changeSelectionPriceMobile(event: any, index: string) {

    this.selectedPriceIndex = event.target.checked ? index : undefined;
    if(this.selectedPriceIndex === undefined){
      this.minPrice = 0;
      this.maxPrice = 0;
      //this.onPageChange(this.pagination);
    }else{
      let itemSelectd = this.getItemFromGroupSearch(index);
      if(itemSelectd && itemSelectd !== undefined && itemSelectd != null){
        this.minPrice = itemSelectd.minPrice;
        this.maxPrice = itemSelectd.maxPrice;
        //this.onPageChange(this.pagination);
      }
    }
    
    event.preventDefault();
  }

  changeSelectionKeySearchMobile(event: any, index: string) {
    this.selectedTextIndex = event.target.checked ? index : undefined;
    if(this.selectedTextIndex === undefined){
      this.searchKey = ''; 
       //this.onPageChange(this.pagination);
    }else{
      let itemSelectd = this.getItemFromGroupSearch(index);
      if(itemSelectd && itemSelectd !== undefined && itemSelectd != null){
        this.searchKey = itemSelectd.filterSearchKey;
        //this.onPageChange(this.pagination);
      }
    }
  
    event.preventDefault();
  }

  redirecUrl(event: any, cate: string, searchKey: string){
    this._commonService.redirectRouter(event, searchKey, cate);
  }

  redirectRouterDetailProduct(event: any, searchKey: string){
    this._commonService.redirectRouterDetailProduct(event, searchKey);
  }
}

