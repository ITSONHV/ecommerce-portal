import { environment } from './../environments/environment';
import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry,mergeMap } from 'rxjs/operators';
import { AppConfigs } from 'src/app/commons/AppConfigs';
import { ObjectModel, ResponseBase } from 'src/models/object_paging.model';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';
import { ICart, ItemsCart, ItemsFavotire } from 'src/interfaces/ICart';
import { ProductModel } from 'src/models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { AppConsts } from 'src/app/commons/AppConsts';
import { SwalService, TYPE } from './swal.service';
import { EncryptService } from './encrypt.service';

@Injectable({
    providedIn: 'root',
})
export class MainService implements OnInit{
    itemsCart: ICart[] = [];
    itemsFavorite: ICart[] = [];
    productRecent: any[] = [];
    totalMoney: number;
    urlApi = environment.apiUrl;
    categoryName : string;
    categoryId : number;
    public isShowMenu = true;
    public productBestSales :any;
    constructor(private http: HttpClient, private _encrypt : EncryptService)
     {
        //cookieService = inject(CookieService);
     }

     ngOnInit(): void {
        this.getItemsCart();
        this.getItemsFavorite();
     }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        }),
    };
    getCategories(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getCategorise)
            .pipe(
                map(
                    (respone: any) => respone
                )
            )
    }

    getCategoryBySlug(slug: string): Observable<ObjectModel> {
        return this.http.get<any>(`${this.urlApi}${AppConfigs.urls.getCategoryBySlug}${slug}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    
    getProductPages(): Observable<ObjectModel> {   
        var objReq = this._encrypt.encryptNoStringfy("");
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages  
        + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
        + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    getProductBestDiscountPages(): Observable<ObjectModel> {
        var objReq = this._encrypt.encryptNoStringfy(JSON.stringify({IsBestDiscount : 1}));
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages
        + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
        + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    getProductIsHotPages(): Observable<ObjectModel> {
        var objReq = this._encrypt.encryptNoStringfy(JSON.stringify({ IsHot : 1}));
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages
            + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
            + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    getProductIsNewPages(): Observable<ObjectModel> {
        var objReq = this._encrypt.encryptNoStringfy(JSON.stringify({ IsNew : 1}));
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages
            + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
            + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    getProductIsBestSellingPages(limit : number): Observable<ObjectModel> {
        var objReq = this._encrypt.encryptNoStringfy(JSON.stringify({ IsBestSelling : 1, PageSize: limit}));    
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages
        + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
        + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    this.productBestSales = result;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    getProductPagesByCategoryId(categoryId: number): Observable<ObjectModel> {
        var objReq = this._encrypt.encryptNoStringfy(JSON.stringify({ CategoryId : categoryId}));    
        
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages
            + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
            + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    getProductPagesByCategorySlug(slug: string): Observable<ObjectModel> {
        var objReq = this._encrypt.encryptNoStringfy(JSON.stringify({ UrlCategorySlug : slug}));    
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages + 
        + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
        + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    getProductbyProductId(productId: string): Observable<any> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductbyProductId+ `${productId}`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    getProductbyProductNameSlug(dataHash: any): Observable<ObjectModel> {
        var objReq =JSON.parse(dataHash);
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductbyProductNameSlug 
            + "HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
            + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`)
            .pipe(
               // retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    return of<ObjectModel>(<ObjectModel>response_);
                })
            )
    };
    getSliderLimit(limit: number): Observable<ObjectModel> {
        return this.http.get<any>(`${this.urlApi}${AppConfigs.urls.getSliderLimit}${limit}`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    return of<ObjectModel>(<ObjectModel>response_);
                })
            )
    };

    getTrademarkLimit(limit: number): Observable<ObjectModel> {
        return this.http.get<any>(`${this.urlApi}${AppConfigs.urls.getTrademarkLimit}${limit}`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    return of<ObjectModel>(<ObjectModel>response_);
                })
            )
    };

    getReviewProductLimit(limit: number, productId: number): Observable<ObjectModel> {
        return this.http.get<any>(`${this.urlApi}${AppConfigs.urls.getReviewProducts}` + "?limit=" + `${limit}` +"&productId=" + `${productId}`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    return of<ObjectModel>(<ObjectModel>response_);
                })
            )
    };

    getGroupSerrchByCategoryID(cateID : number): Observable<ObjectModel> {
        return this.http.get<any>(`${this.urlApi}${AppConfigs.urls.getGroupSerrchByCategoryID}${cateID}`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    return of<ObjectModel>(<ObjectModel>response_);
                })
            )
    };

    getProductListPagings(page: number, pageSize: number, keySearch: string, minPrice: number, maxPrice: number, slugCate: string, sortValue : number, typeStatus : string)
    : Observable<ApiPagingResponse<PagingModel>> {
        var rawReq : any = {};
        let queryUrls = `${this.urlApi}${AppConfigs.urls.getProductPages}`;
        rawReq.Page = page;
        rawReq.PageSize = pageSize;
        rawReq.MinPrice = minPrice;
        rawReq.MaxPrice = maxPrice;
        rawReq.SortValue = sortValue;

        if(keySearch != undefined && keySearch !== ''){
            rawReq.ProductName = keySearch;
        }

        if(slugCate != undefined && slugCate != null && slugCate !== ''){
            rawReq.UrlCategorySlug = slugCate;
        }
        // 0 tất cả , 1 uu đãi, 2 bán chạy, 3 mới, nổi bậc 4
        if(typeStatus !== undefined  && typeStatus !=null ){
            switch(typeStatus){
                case "1": {
                    rawReq.IsBestDiscount = 1;
                    break;
                } 
                case "2": {
                    rawReq.IsBestSelling = 1;
                    break;
                } 
                case "3": {
                    rawReq.IsNew = 1;
                    break;
                }
                case "4": {
                    rawReq.IsHot = 1;
                    break;
                }
                default:{
    
                }
            }
        }
        var objReq = this._encrypt.encryptNoStringfy(JSON.stringify(rawReq));     
        queryUrls = queryUrls + "?HashKey=" + `${encodeURIComponent( objReq.HashKey)}`
                 + "&HashData=" + `${encodeURIComponent(objReq.HashData)}`;      
        return this.http.get<any>(queryUrls)
            .pipe(
                //retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    return of<ApiPagingResponse<PagingModel>>(<ApiPagingResponse<PagingModel>>response_);
                })
            )
    };

    getListBanking(): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getListBanking)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    addToCart(product: ProductModel, quantity: number) { 
        try {
            const index = this.itemsCart.findIndex(item => item.id == product.id)
            if (index >= 0) {
                this.itemsCart[index].quantity += quantity;
                if (this.itemsCart[index].quantity <= 0) {
                    this.removeItemCart(product.id);
                }
                this.setCartToLocalStorage();
            }
            else {
                var cart: ICart;
                cart = {
                    id: product.id,
                    productName: product.productName,
                    price: product.promotionPrice,
                    image: product.imageUrl,
                    quantity: quantity,
                    productNameSlug: product.productNameSlug,
                    content: encodeURIComponent(product.content)
                }
                this.itemsCart.push(cart);

                this.setCartToLocalStorage();
            }
        } catch {
            console.log("err add card");
            this.itemsCart = [];
            this.setCartToLocalStorage();
        }     
    }

    addQuantityToCart(productId: number, quantity: number) { 
        const index = this.itemsCart.findIndex(item =>item.id == productId)
        if(index >= 0){
            this.itemsCart[index].quantity += quantity;
            if(this.itemsCart[index].quantity <= 0){
                this.removeItemCart(productId);
            }
            this.setCartToLocalStorage();
        }       
    }

    addToCartWithCart(cart: ICart, quantity: number) { 
        const index = this.itemsCart.findIndex(item =>item.id == cart.id)
        if(index >= 0){
            this.itemsCart[index].quantity += quantity;
            if(this.itemsCart[index].quantity <= 0){
                this.removeItemCart(cart.id);
            }
            this.setCartToLocalStorage();
        }
        else{
            this.itemsCart.push(cart); 

            this.setCartToLocalStorage();
        }
    }

    getItemsCart() { 
        this.getCartToLocalStorage();    
        
        return this.itemsCart;
    }

    clearItemsCart(carts: ICart[]) {
         this.itemsCart = [];
         this.itemsCart = carts;
         this.setCartToLocalStorage();
         return this.itemsCart;

    }
    removeItemCart(productId: number)
    {
        this.itemsCart.forEach((element,index)=>{
            if(element.id === productId) 
            {
                this.itemsCart.splice(index,1);
                 this.setCartToLocalStorage();
            }
         });
         return this.itemsCart;
    }

    setCartToLocalStorage(){
        var date = new Date();
        var cartLocal :ItemsCart;
        cartLocal = {
            data : this.itemsCart,
            expired : date.setDate(date.getDate() + 2)
        }
        let a = encodeURI(JSON.stringify(cartLocal));
        localStorage.setItem(btoa(AppConsts.myCart), btoa(a));
    }

    getCartToLocalStorage(){
        if(this.itemsCart && this.itemsCart.length > 0){
            return  this.itemsCart;
        }
        var key = btoa(AppConsts.myCart);
        if(localStorage.getItem(key)){
           let cart =  JSON.parse(decodeURI(atob(localStorage.getItem(key) ?? "")));
           this.itemsCart = cart.data;
           var date = new Date().getTime();
           var dateCart = cart.expired;
           if(date > dateCart){
                localStorage.removeItem(key);
           }
        }
         return this.itemsCart;
    }

    // lưu product vừa xem
    setProductRecent(product: any) {
        try{
            product.imageUrl = product.productImages[0]?.imageUrl;
            if (localStorage.getItem("product-recent") !== null &&
                localStorage.getItem("product-recent")?.length != 0) {
                var obj = JSON.parse(localStorage.getItem("product-recent") ?? "");
                let prodcutRecents = obj.data;
                let itemExist = prodcutRecents.filter((item: any) => {
                    return item.id === product.id
                });
    
                if (itemExist == undefined || itemExist.length == 0) {
                    prodcutRecents.push(product);
                    localStorage.setItem('product-recent', JSON.stringify(prodcutRecents));
    
                    var date = new Date();
                    var proRecent: any;
                    proRecent = {
                        data: prodcutRecents,
                        expired: date.setDate(date.getDate() + 1)
                    }
                    let a = JSON.stringify(proRecent);
                    localStorage.setItem('product-recent', a);
                }
            }
            else {
                this.productRecent.push(product);
                var date = new Date();
                var proRecent: any;
                proRecent = {
                    data: this. productRecent,
                    expired: date.setDate(date.getDate() + 1)
                }
                let a = JSON.stringify(proRecent);
                localStorage.setItem('product-recent', a);
            }
        }
        catch
        {
            console.log("recent err");
            localStorage.removeItem('product-recent');
        }
    }
    // lấy product vừa xem
    getProductRecent() {
        try{
            if (localStorage.getItem("product-recent") !== null &&
            localStorage.getItem("product-recent")?.length != 0) {
            var obj = JSON.parse(localStorage.getItem("product-recent") ?? "");
            var date = new Date().getTime();
            var dateProductRecent = obj.expired;
            if(date > dateProductRecent){
                 localStorage.removeItem('product-recent');
            }
            return obj.data ?? "";
        }
        }catch{

            console.log("recent err");
            localStorage.removeItem('product-recent');
        }
        
    }

    /* yêu thích */
    setFavoriteToLocalStorage(){
        var date = new Date();
        var favoriteLocal :ItemsFavotire;
        favoriteLocal = {
            data : this.itemsFavorite,
            expired : date.setDate(date.getDate() + 2)
        } 
        localStorage.setItem(btoa(AppConsts.myFavorite), btoa(JSON.stringify(favoriteLocal)));
    }

    getFavoriteToLocalStorage(){
        if(this.itemsFavorite && this.itemsFavorite.length > 0){
            return this.itemsFavorite;
        }

        var key = btoa(AppConsts.myFavorite);
        if(localStorage.getItem(key)){
           let favorite =  JSON.parse(atob(localStorage.getItem(key) ?? ""));
           this.itemsFavorite = favorite.data;
           var date = new Date().getTime();
           var dateFavorite = favorite.expired;
           if(date > dateFavorite){
                localStorage.removeItem(key);
           }
        }
         return this.itemsFavorite;
    }
    addToFavorite(product: ProductModel) { 
        const index = this.itemsFavorite.findIndex(item =>item.id == product.id)
        if(index == -1){
            var cart: ICart;
            cart = {
                id: product.id,
                productName: product.productName,
                price: product.promotionPrice,
                image: product.imageUrl,
                quantity: 1,
                productNameSlug: product.productNameSlug,
                content : encodeURIComponent(product.content)
            }

            this.itemsFavorite.push(cart); 
            this.setFavoriteToLocalStorage();
        }
    }
    getItemsFavorite() { 
        return this.getFavoriteToLocalStorage();
    }

    clearItemsFavorite() { this.itemsFavorite = []; return this.itemsFavorite;}
    removeItemFavorite(productId: number)
    {
        this.itemsFavorite.forEach((element,index)=>{
            if(element.id === productId)  this.itemsFavorite.splice(index,1);
         });
         this.setFavoriteToLocalStorage();
         return this.itemsFavorite;
    }
    /* End yêu thích */


    /**/
    addReviewProduct(data: string): Observable<ResponseBase> { 
        return this.http.post<any>(this.urlApi + AppConfigs.urls.addReviewProduct, data, this.httpOptions).pipe(
            mergeMap((response_: any) => {
                return of<ResponseBase>(<ResponseBase>response_);
            })
        )
    }

    getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}