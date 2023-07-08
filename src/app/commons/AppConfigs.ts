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
        getSliderLimit : "Slides/limit?limit=",
        getTrademarkLimit : "trademark/limit?limit=",
        getProductBestDiscountPages : "Product/paging?IsBestDiscount=1",
        getProductIsHotPages : "Product/paging?IsHot=1",
        getProductIsNewPages : "Product/paging?IsNew=1",
        getProductIsBestSellingPages : "Product/paging?IsBestSelling=1",        
        getReviewProducts : "Product/get-reviews",        
    }
}