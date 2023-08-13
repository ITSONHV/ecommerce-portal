import { environment } from './../environments/environment';
import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { EncryptService } from './encrypt.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class CommonService implements OnInit {
    constructor(private _encrypt: EncryptService
        , private activatedRoute: ActivatedRoute
        , private router: Router) {
    }

    ngOnInit(): void {
    }

    redirectRouter(event: any, value: string, cateSelect: string) {
        if (cateSelect === 'xay-dung-cau-hinh') {
            this.router.navigate(
                ['xay-dung-cau-hinh'],
                {
                    relativeTo: this.activatedRoute,
                    queryParams: null,
                    queryParamsHandling: 'merge'
                }
            );

            return;
        }

        let queryParams: Params = { searchKey: value };
        if (cateSelect !== undefined && cateSelect != null && cateSelect != '') {
            queryParams = { slug: cateSelect, searchKey: value };
        } else {
            queryParams = { slug: null, typeStatus: null, searchKey: value };
        }

        let viewMode = '';
        this.activatedRoute.queryParams.forEach(params => {
            if (params['viewMode']) {
                viewMode = params['viewMode'];
                queryParams= {...queryParams, viewMode: viewMode}
            }
            else {
                queryParams= {...queryParams, viewMode: 'grid'}
            }
        });
        let page = (viewMode === '' || viewMode === 'grid') ? 'danh-muc-san-pham-g' : 'danh-muc-san-pham-l';

        this.router.navigate(
            ["" + page + ""],
            {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            }
        )
        event.preventDefault();
    }

    redirectRouterDetailProduct(event: any, value: string) {
        let queryParams= {slug: value ,viewMode : 'grid' }     
        let viewMode = '';
        this.activatedRoute.queryParams.forEach(params => {
            if (params['viewMode']) {
                viewMode = params['viewMode'];
                queryParams= {...queryParams, viewMode: viewMode}
            }
        });
        this.router.navigate(
            ['chi-tiet'],
            {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            }
        )
        event.preventDefault();
    }
}