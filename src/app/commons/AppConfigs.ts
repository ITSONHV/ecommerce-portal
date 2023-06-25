import { environment } from '../../environments/environment';
export const AppConfigs = {
    urls: {
        getExpense:'/expense',
        getCategorise:'category/all',
        getProductPages : "Product/paging",
        getProductPagesbyCategoryId : "Product/paging?CategoryId=",
        getProductPagesbyCategorySlug : "Product/paging?UrlCategorySlug=",
        getProductbyProductNameSlug : "Product/by-slug?slug=",
        getProductbyProductId : "ProductProduct/by-id?id=",
    }
}