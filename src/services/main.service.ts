import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AppConfigs } from 'src/app/commons/AppConfigs';
import { mergeMap } from 'rxjs/operators';
import { ObjectModel } from 'src/models/object_paging.model';
@Injectable({
    providedIn: 'root',
})
export class MainService {
    constructor(private http: HttpClient) { }
    urlApi = environment.apiUrl;
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
}