import { environment } from '../../environments/environment';
export const AppConfigs = {
    urls: {
        getExpense:'/expense',
        getCategorise:'category/all',
        getCategoryBySlug:'category/by-slug?slug=',
        getCategoryChildBySlug:'category/child-by-parent?slug=',
        getProductPages : "Product/paging",
        getProductbyProductNameSlug : "Product/by-slug?",
        getProductbyProductId : "ProductProduct/by-id?id=",
        getSliderLimit : "Slides/limit?limit=",
        getTrademarkLimit : "trademark/limit?limit=",  
        getReviewProducts : "Product/get-reviews",        
        getGroupSerrchByCategoryID : "filters/category-by-id?CategoryId=",  
        getListBanking : "listbanktranser/all",     
        getBanners : "Banners/limit?limit=",     

        addReviewProduct : "Product/add-review",          
        verifyDataPayment : "payment/verify-data",    
        createPayment : "payment",   
        getOrderByPhone : "payment/paging",            
    }
}