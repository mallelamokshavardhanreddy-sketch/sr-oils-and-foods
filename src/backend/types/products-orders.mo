import CommonTypes "common";

module {
  public type ProductId = CommonTypes.ProductId;
  public type OrderId = CommonTypes.OrderId;
  public type Timestamp = CommonTypes.Timestamp;

  public type StockStatus = { #available; #outOfStock };

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    stock : StockStatus;
    createdAt : Timestamp;
  };

  public type OrderItem = {
    productId : ProductId;
    name : Text;
    qty : Nat;
    price : Float;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #packed;
    #shipped;
    #delivered;
  };

  public type Order = {
    orderId : OrderId;
    customerId : Principal;
    customerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    items : [OrderItem];
    totalPrice : Float;
    status : OrderStatus;
    createdAt : Timestamp;
  };

  public type CreateProductRequest = {
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    stock : StockStatus;
  };

  public type UpdateProductRequest = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    stock : StockStatus;
  };

  public type CreateOrderRequest = {
    customerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    items : [OrderItem];
  };

  public type SortBy = { #priceAsc; #priceDesc; #newest };
};
