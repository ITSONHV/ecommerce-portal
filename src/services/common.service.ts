import { environment } from './../environments/environment';
import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { EncryptService } from './encrypt.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { IBuildPC, ItemsBuildPC } from 'src/interfaces/IBuildPC';
import { AppConsts } from 'src/app/commons/AppConsts';
import { ProductModel } from 'src/models/product.model';

@Injectable({
    providedIn: 'root',
})
export class CommonService implements OnInit {
    itemBuildPC: IBuildPC[] = [];

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


    /* Phần lưu thông tin build PC */
    addToBuidPC(enumSelect: number, quantity: number, product: ProductModel) { 
        try {
            const index = this.itemBuildPC.findIndex(item => item.id == enumSelect)
            if (index >= 0) {
                this.itemBuildPC[index].quantity = quantity;
                if (this.itemBuildPC[index].quantity <= 0) {
                    this.removeItemBuildPC(enumSelect);
                }
                this.setBuildPCToLocalStorage();
            }
            else {
                var pc: IBuildPC;
                pc = {
                    productid:product.id,
                    id: enumSelect,
                    productName: product.productName,
                    price: product.promotionPrice,
                    image: product.imageUrl,
                    quantity: quantity,
                    productNameSlug: product.productNameSlug,
                    productCode : product.productCode,
                    promotionPrice : product.promotionPrice,
                    content : encodeURIComponent(product.content)
                }
                this.itemBuildPC.push(pc);
                this.setBuildPCToLocalStorage();
            }
        } catch {
            console.log("err add card");
            this.itemBuildPC = [];
        }     
    }

    addQuantiyuBuidPC(enumSelect: number, quantity: number) { 
        try {
            const index = this.itemBuildPC.findIndex(item => item.id == enumSelect)
            if (index >= 0) {
                this.itemBuildPC[index].quantity = quantity;
                if (this.itemBuildPC[index].quantity <= 0) {
                    this.removeItemBuildPC(enumSelect);
                }
                this.setBuildPCToLocalStorage();
            }

        } catch {
            console.log("err add card");
            this.itemBuildPC = [];
        }     
    }

    removeItemBuildPC(id: number)
    {
        this.itemBuildPC.forEach((element,index)=>{
            if(element.id === id) 
            {
                this.itemBuildPC.splice(index,1);
                 this.setBuildPCToLocalStorage();
            }
         });
         return this.itemBuildPC;
    }

    clearItemBuildPC(builds: IBuildPC[]) {
        this.itemBuildPC = [];
        this.itemBuildPC = builds;
        this.setBuildPCToLocalStorage();
        return this.itemBuildPC;
   }

    setBuildPCToLocalStorage(){
        var date = new Date();
        var buidPCLocal : ItemsBuildPC;
        buidPCLocal = {
            data : this.itemBuildPC,
            expired : date.setDate(date.getDate() + 1)
        }
        let a = encodeURI(JSON.stringify(buidPCLocal));
        localStorage.setItem(btoa(AppConsts.buildPC), btoa(a));
    }

    getBuildPCFromLocalStorage(){
        if(this.itemBuildPC && this.itemBuildPC.length > 0){
            return  this.itemBuildPC;
        }
        var key = btoa(AppConsts.buildPC);
        if(localStorage.getItem(key)){
           let cart =  JSON.parse(decodeURI(atob(localStorage.getItem(key) ?? "")));
           this.itemBuildPC = cart.data;
           var date = new Date().getTime();
           var dateCart = cart.expired;
           if(date > dateCart){
                localStorage.removeItem(key);
           }
        }
         return this.itemBuildPC;
    }


    // addQuantityToCart(productId: number, quantity: number) { 
    //     const index = this.itemsCart.findIndex(item =>item.id == productId)
    //     if(index >= 0){
    //         this.itemsCart[index].quantity += quantity;
    //         if(this.itemsCart[index].quantity <= 0){
    //             this.removeItemCart(productId);
    //         }
    //         this.setCartToLocalStorage();
    //     }       
    // }
}