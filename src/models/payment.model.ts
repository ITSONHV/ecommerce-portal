export class PaymentModel {
    ProductOrderRequests : ProductOrderRequest[];
    PaymentType: number;
    ShippingAddress:string ;
    ShippingPhone:string ;
    ShippingName:string ;
    CustomerAddress:string ;
    CustomerEmail:string ;
    CustomerName:string ;
    CustomerPhone :string ;
    Note :string ;
  }

  export class ProductOrderRequest{
    ProductID: number;
    Quantity: number;
  }
    