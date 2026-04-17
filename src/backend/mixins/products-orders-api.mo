import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/products-orders";
import ProductsOrdersLib "../lib/products-orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Types.ProductId, Types.Product>,
  orders : Map.Map<Types.OrderId, Types.Order>,
) {
  var nextProductId : Nat = 0;
  var nextOrderId : Nat = 0;

  // Seed sample products on first init (only when store is empty)
  if (products.isEmpty()) {
    nextProductId := ProductsOrdersLib.seedSampleProducts(products, nextProductId, Time.now());
  };

  // Helper: check if caller is admin without trapping on unregistered users
  func requireAdmin(caller : Principal) {
    let isAdmin = switch (accessControlState.userRoles.get(caller)) {
      case (? #admin) { true };
      case (_) { false };
    };
    if (not isAdmin) {
      Runtime.trap("Unauthorized: owner only");
    };
  };

  // ─── Product: owner writes ────────────────────────────────────────────────

  public shared ({ caller }) func addProduct(req : Types.CreateProductRequest) : async Types.Product {
    requireAdmin(caller);
    let product = ProductsOrdersLib.addProduct(products, nextProductId, req, Time.now());
    nextProductId += 1;
    product;
  };

  public shared ({ caller }) func updateProduct(req : Types.UpdateProductRequest) : async Bool {
    requireAdmin(caller);
    ProductsOrdersLib.updateProduct(products, req);
  };

  public shared ({ caller }) func deleteProduct(id : Types.ProductId) : async Bool {
    requireAdmin(caller);
    ProductsOrdersLib.deleteProduct(products, id);
  };

  // ─── Product: public reads ────────────────────────────────────────────────

  public query func getProduct(id : Types.ProductId) : async ?Types.Product {
    ProductsOrdersLib.getProduct(products, id);
  };

  public query func listProducts(category : ?Text, search : ?Text, sortBy : ?Types.SortBy) : async [Types.Product] {
    ProductsOrdersLib.listProducts(products, category, search, sortBy);
  };

  // ─── Orders: customer creates, owner manages ──────────────────────────────

  public shared ({ caller }) func createOrder(req : Types.CreateOrderRequest) : async Types.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required to place an order");
    };
    let order = ProductsOrdersLib.createOrder(orders, products, nextOrderId, caller, req, Time.now());
    nextOrderId += 1;
    order;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Types.OrderId, status : Types.OrderStatus) : async Bool {
    requireAdmin(caller);
    ProductsOrdersLib.updateOrderStatus(orders, orderId, status);
  };

  public query ({ caller }) func listAllOrders() : async [Types.Order] {
    requireAdmin(caller);
    ProductsOrdersLib.listAllOrders(orders);
  };

  public query ({ caller }) func listMyOrders() : async [Types.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required");
    };
    ProductsOrdersLib.listCustomerOrders(orders, caller);
  };

  // ─── Admin: seed sample data (idempotent) ─────────────────────────────────

  public shared ({ caller }) func seedProducts() : async Nat {
    requireAdmin(caller);
    let newNextId = ProductsOrdersLib.seedSampleProducts(products, nextProductId, Time.now());
    nextProductId := newNextId;
    newNextId;
  };
};
