export class ObjectModel {
    data : Object = {
        total : 0,
        pageSize : 0,
        page : 0,
        totalAmount : 0,
        data : []
    }
}


export class ResponseBase {
    hasError : boolean;
    errorMessage : string;
    errorCode : number;
    statusCode : number;
}