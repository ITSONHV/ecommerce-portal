import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppConfigs } from 'src/app/commons/AppConfigs';

@Injectable({
    providedIn: 'root',
})
export class MainService {
    constructor(private http: HttpClient) { }
    urlApi = environment.apiUrl;
    getExpense () :  Observable<HttpResponse<any>>{
        return this.http.get<any>(this.urlApi+AppConfigs.urls.getExpense);
    } 
}