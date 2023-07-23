import { environment } from './../environments/environment';
import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry,mergeMap } from 'rxjs/operators';
import { AppConfigs } from 'src/app/commons/AppConfigs';
import { ObjectModel, ResponseBase } from 'src/models/object_paging.model';
import { ICart, ItemsCart, ItemsFavotire } from 'src/interfaces/ICart';
import { ProductModel } from 'src/models/product.model';
import { AppConsts } from 'src/app/commons/AppConsts';

@Injectable({
    providedIn: 'root',
})
export class PaymentService implements OnInit{
    itemsCart: ICart[] = [];
    itemsFavorite: ICart[] = [];
    productRecent: any[] = [];
    totalMoney: number;
    urlApi = environment.apiUrl;
    categoryName : string;
    categoryId : number;
    public isShowMenu = true;
    public productBestSales :any;
    constructor(private http: HttpClient)
     {
     }

     ngOnInit(): void {
     }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        }),
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

    /**/
    addReviewProduct(data: string): Observable<ResponseBase> { 
        return this.http.post<any>(this.urlApi + AppConfigs.urls.addReviewProduct, data,this.httpOptions).pipe(
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