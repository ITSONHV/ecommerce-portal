import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AppConfigs } from 'src/app/commons/AppConfigs';
import { mergeMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class MainService {
    constructor(private http: HttpClient) { }
    urlApi = environment.apiUrl;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          wit:
            (window.screen.width * 68).toString() +
            (window.screen.height * 68).toString(),
        }),
    };
    getCategories(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.urlApi + AppConfigs.urls.getCategorise)
        .pipe(
            map(
                (respone : any)=>respone
            )
        )
    }
    // getCategories(): Observable<CategoryModel> {
    //     return this.http.get<any>(this.urlApi + AppConfigs.urls.getCategorise)
    //     .pipe(
    //         mergeMap((response_: any) => {
    //             let result = new CategoryModel();
    //             result = response_.result;
    //             this.category = result;
    //             return of<CategoryModel>(<any>result);
    //           })
    //     )
    // }
}