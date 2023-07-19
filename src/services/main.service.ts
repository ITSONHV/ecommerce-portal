import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry,mergeMap } from 'rxjs/operators';
import { AppConfigs } from 'src/app/commons/AppConfigs';
import { ObjectModel } from 'src/models/object_paging.model';
import { ApiPagingResponse, PagingModel } from 'src/models/paging.model';
import { ICart } from 'src/interfaces/ICart';
import { ProductModel } from 'src/models/product.model';
@Injectable({
    providedIn: 'root',
})
export class MainService {
    itemsCart: ICart[] = [];
    productRecent: any[] = [];
    totalMoney: number;
    urlApi = environment.apiUrl;
    categoryName : string;
    categoryId : number;
    public isShowMenu = true;
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
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

    getCategoriesAndSetLocal(): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getCategorise)
            .pipe(
                mergeMap((response_: any) =>{
                      debugger;
                        let result = new ObjectModel();
                        result = response_;
                        let menuAll : any = of<ObjectModel>(<ObjectModel>result);
                       let menuObject = menuAll.data;
                       let allMenu: any = menuObject.filter((item: any) => {
                          return item.categoryParent == 0 || item.categoryParent == null
                        });
                       let subMenu: any = menuObject.filter((item: any) => {
                          return (item.categoryParent != 0 && item.categoryParent != null)
                        });
                         allMenu.forEach((parent: any) => {
                          // Lọc ra các phần tử của mảng con có parentId bằng với id của phần tử hiện tại của mảng cha
                          let children = subMenu.filter((child: any) => child.categoryParent === parent.id);
                          // Gán thuộc tính sub bằng giá trị của thuộc tính value của các phần tử con
                          if (children.length > 0)
                            parent.submenu = children.map((child: any) => child);
                        });
                        if (allMenu.length > 0) {
                          if (localStorage.getItem('allmenu-app')?.length != 0) {
                            localStorage.removeItem('allmenu-app');
                            localStorage.setItem('allmenu-app', JSON.stringify(allMenu));
                
                            localStorage.removeItem('all-menu-search');
                            localStorage.setItem('all-menu-search', JSON.stringify(menuObject));
                          }
                          else {
                            localStorage.setItem('allmenu-app', JSON.stringify(allMenu));
                
                            localStorage.setItem('all-menu-search', JSON.stringify(menuObject));
                
                          }
                        }
                        //this.spinner.hide();
    
    
                        return of<ObjectModel>(<ObjectModel>allMenu);
                 })
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
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPages)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    getProductBestDiscountPages(): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductBestDiscountPages)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    getProductIsHotPages(): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductIsHotPages)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    getProductIsNewPages(): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductIsNewPages)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    getProductIsBestSellingPages(limit : number): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductIsBestSellingPages + `&PageSize=${limit}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }

    getProductPagesByCategoryId(categoryId: number): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPagesbyCategoryId + `${categoryId}`)
            .pipe(
                mergeMap((response_: any) => {
                    let result = new ObjectModel();
                    result = response_;
                    return of<ObjectModel>(<ObjectModel>result);
                })
            )
    }
    getProductPagesByCategorySlug(slug: string): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductPagesbyCategorySlug+ `${slug}`)
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
    getProductbyProductNameSlug(slug: string): Observable<ObjectModel> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getProductbyProductNameSlug+ `${slug}`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
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
        let queryUrls = `${this.urlApi}${AppConfigs.urls.getProductListPaging}` 
        + "?page=" + `${page}` 
        + "&pageSize=" + `${pageSize}` 
        + "&minPrice=" + `${minPrice}` 
        + "&maxPrice=" + `${maxPrice}` 
        + "&sortValue=" + `${sortValue}`;
        
        if(keySearch != undefined && keySearch !== ''){
            queryUrls += "&productName=" + `${keySearch}` ;
        }

        if(slugCate != undefined && slugCate != null && slugCate !== ''){
            queryUrls += "&UrlCategorySlug=" + `${slugCate}` ;
        }
        // 0 tất cả , 1 uu đãi, 2 bán chạy, 3 mới, nổi bậc 4
        if(typeStatus !== undefined  && typeStatus !=null ){
            switch(typeStatus){
                case "1": {
                    queryUrls += "&IsBestDiscount=1" ;
                    break;
                } 
                case "2": {
                    queryUrls += "&IsBestSelling=1";
                    break;
                } 
                case "3": {
                    queryUrls += "&IsNew=1" ;
                    break;
                }
                case "4": {
                    queryUrls += "&IsHot=1" ;
                    break;
                }
                default:{
    
                }
            }
        }
        

        return this.http.get<any>(queryUrls)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                mergeMap((response_: any) => {
                    return of<ApiPagingResponse<PagingModel>>(<ApiPagingResponse<PagingModel>>response_);
                })
            )
    };
    addToCart(product: ProductModel, quantity: number) {    
        const index = this.itemsCart.findIndex(item =>item.id == product.id)
        if(index >= 0){
            this.itemsCart[index].quantity += quantity;
        }
        else{
            var cart:ICart;
            cart = { 
              id: product.id, 
              productName: product.productName, 
              price: product.promotionPrice, 
              image: product.imageUrl, 
              quantity: quantity,
              productNameSlug : product.productNameSlug
            }
            this.itemsCart.push(cart); 
        }
    }
    getItemsCart() { return this.itemsCart; }
    clearItemsCart() { this.itemsCart = []; return this.itemsCart;}

    // lưu product vừa xem
    setProductRecent(product: any) {
        if(localStorage.getItem("product-recent") !== null &&
           localStorage.getItem("product-recent")?.length != 0)
        {
            let prodcutRecents = JSON.parse(localStorage.getItem("product-recent") ?? "");
            let itemExist = prodcutRecents.filter((item: any) => {
                return item.id === product.id
              });
            

              if(itemExist == undefined || itemExist.length == 0){
                prodcutRecents.push(product);
                localStorage.setItem('product-recent', JSON.stringify(prodcutRecents));
              }
        }
        else{
            this.productRecent.push(product);
            localStorage.setItem('product-recent', JSON.stringify(this.productRecent));
        }
    }
    // lấy product vừa xem
    getProductRecent() {
        if (localStorage.getItem("product-recent") !== null &&
            localStorage.getItem("product-recent")?.length != 0) {
            return JSON.parse(localStorage.getItem("product-recent") ?? "");
        }
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