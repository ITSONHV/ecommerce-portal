import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry,mergeMap } from 'rxjs/operators';
import { AppConfigs } from 'src/app/commons/AppConfigs';
import { ObjectModel } from 'src/models/object_paging.model';
@Injectable({
    providedIn: 'root',
})
export class MainService {
    constructor(private http: HttpClient) { }
    urlApi = environment.apiUrl;
    categoryName : string;
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