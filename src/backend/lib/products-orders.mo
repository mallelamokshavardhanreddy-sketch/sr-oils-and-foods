import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Types "../types/products-orders";

module {
  // ─── Product operations ───────────────────────────────────────────────────

  public func addProduct(
    products : Map.Map<Types.ProductId, Types.Product>,
    nextId : Nat,
    req : Types.CreateProductRequest,
    now : Types.Timestamp,
  ) : Types.Product {
    let product : Types.Product = {
      id = nextId;
      name = req.name;
      description = req.description;
      price = req.price;
      category = req.category;
      imageUrl = req.imageUrl;
      stock = req.stock;
      createdAt = now;
    };
    products.add(nextId, product);
    product;
  };

  public func updateProduct(
    products : Map.Map<Types.ProductId, Types.Product>,
    req : Types.UpdateProductRequest,
  ) : Bool {
    switch (products.get(req.id)) {
      case null { false };
      case (?existing) {
        let updated : Types.Product = {
          existing with
          name = req.name;
          description = req.description;
          price = req.price;
          category = req.category;
          imageUrl = req.imageUrl;
          stock = req.stock;
        };
        products.add(req.id, updated);
        true;
      };
    };
  };

  public func deleteProduct(
    products : Map.Map<Types.ProductId, Types.Product>,
    id : Types.ProductId,
  ) : Bool {
    switch (products.get(id)) {
      case null { false };
      case (?_) {
        products.remove(id);
        true;
      };
    };
  };

  public func getProduct(
    products : Map.Map<Types.ProductId, Types.Product>,
    id : Types.ProductId,
  ) : ?Types.Product {
    products.get(id);
  };

  func newestFirst(aCreatedAt : Types.Timestamp, bCreatedAt : Types.Timestamp) : { #less; #equal; #greater } {
    if (bCreatedAt > aCreatedAt) { #less }
    else if (bCreatedAt < aCreatedAt) { #greater }
    else { #equal };
  };

  public func listProducts(
    products : Map.Map<Types.ProductId, Types.Product>,
    category : ?Text,
    search : ?Text,
    sortBy : ?Types.SortBy,
  ) : [Types.Product] {
    let searchLower = switch (search) {
      case (?s) { ?s.toLower() };
      case null { null };
    };

    let iter = products.values();

    let afterCategory = switch (category) {
      case (?cat) { iter.filter(func(p : Types.Product) : Bool { p.category == cat }) };
      case null { iter };
    };

    let afterSearch = switch (searchLower) {
      case (?term) {
        afterCategory.filter(func(p : Types.Product) : Bool {
          p.name.toLower().contains(#text term)
        })
      };
      case null { afterCategory };
    };

    let unsorted = afterSearch.toArray();

    switch (sortBy) {
      case (? #priceAsc) {
        unsorted.sort(func(a : Types.Product, b : Types.Product) : { #less; #equal; #greater } {
          Float.compare(a.price, b.price)
        });
      };
      case (? #priceDesc) {
        unsorted.sort(func(a : Types.Product, b : Types.Product) : { #less; #equal; #greater } {
          Float.compare(b.price, a.price)
        });
      };
      case (? #newest) {
        unsorted.sort(func(a : Types.Product, b : Types.Product) : { #less; #equal; #greater } {
          newestFirst(a.createdAt, b.createdAt)
        });
      };
      case null {
        unsorted.sort(func(a : Types.Product, b : Types.Product) : { #less; #equal; #greater } {
          newestFirst(a.createdAt, b.createdAt)
        });
      };
    };
  };

  // ─── Order operations ─────────────────────────────────────────────────────

  public func createOrder(
    orders : Map.Map<Types.OrderId, Types.Order>,
    products : Map.Map<Types.ProductId, Types.Product>,
    nextId : Nat,
    caller : Principal,
    req : Types.CreateOrderRequest,
    now : Types.Timestamp,
  ) : Types.Order {
    var total : Float = 0.0;
    for (item in req.items.values()) {
      switch (products.get(item.productId)) {
        case null { Runtime.trap("Product not found: " # item.productId.toText()) };
        case (?product) {
          if (product.stock == #outOfStock) {
            Runtime.trap("Product out of stock: " # product.name);
          };
          total := total + item.price * item.qty.toFloat();
        };
      };
    };

    let order : Types.Order = {
      orderId = nextId;
      customerId = caller;
      customerName = req.customerName;
      email = req.email;
      phone = req.phone;
      address = req.address;
      items = req.items;
      totalPrice = total;
      status = #pending;
      createdAt = now;
    };
    orders.add(nextId, order);
    order;
  };

  public func updateOrderStatus(
    orders : Map.Map<Types.OrderId, Types.Order>,
    orderId : Types.OrderId,
    status : Types.OrderStatus,
  ) : Bool {
    switch (orders.get(orderId)) {
      case null { false };
      case (?existing) {
        let updated : Types.Order = { existing with status };
        orders.add(orderId, updated);
        true;
      };
    };
  };

  public func listAllOrders(
    orders : Map.Map<Types.OrderId, Types.Order>,
  ) : [Types.Order] {
    let all = orders.values().toArray();
    all.sort(func(a : Types.Order, b : Types.Order) : { #less; #equal; #greater } {
      newestFirst(a.createdAt, b.createdAt)
    });
  };

  public func listCustomerOrders(
    orders : Map.Map<Types.OrderId, Types.Order>,
    caller : Principal,
  ) : [Types.Order] {
    let myOrders = orders.values().filter(func(o : Types.Order) : Bool {
        Principal.equal(o.customerId, caller)
      }).toArray();
    myOrders.sort(func(a : Types.Order, b : Types.Order) : { #less; #equal; #greater } {
      newestFirst(a.createdAt, b.createdAt)
    });
  };

  // ─── Seed sample products ─────────────────────────────────────────────────

  public func seedSampleProducts(
    products : Map.Map<Types.ProductId, Types.Product>,
    nextProductId : Nat,
    now : Types.Timestamp,
  ) : Nat {
    type SampleTuple = (Text, Text, Float, Text, Text, Types.StockStatus);
    let samples : [SampleTuple] = [
      (
        "Classic White T-Shirt",
        "Premium 100% cotton t-shirt with a relaxed fit. Perfect for everyday wear. Available in multiple sizes.",
        19.99,
        "Clothing",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        #available,
      ),
      (
        "Ceramic Coffee Mug",
        "Large 16oz ceramic mug with a comfortable handle. Microwave and dishwasher safe. Great for morning coffee or tea.",
        14.99,
        "Kitchen",
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
        #available,
      ),
      (
        "Canvas Tote Bag",
        "Eco-friendly canvas tote bag with reinforced handles. Holds up to 30 lbs. Perfect for groceries or daily use.",
        24.99,
        "Accessories",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        #available,
      ),
      (
        "Running Sneakers",
        "Lightweight mesh running shoes with cushioned soles. Breathable design ideal for jogging and casual wear.",
        89.99,
        "Footwear",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        #available,
      ),
      (
        "Wireless Bluetooth Earbuds",
        "True wireless earbuds with 24-hour battery life, active noise cancellation, and IPX5 water resistance.",
        59.99,
        "Electronics",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
        #available,
      ),
      (
        "Genuine Leather Wallet",
        "Slim bifold wallet with RFID blocking. Fits up to 8 cards plus cash. Handcrafted from full-grain leather.",
        34.99,
        "Accessories",
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
        #available,
      ),
      (
        "Insulated Water Bottle",
        "32oz stainless steel bottle that keeps drinks cold 24 hours or hot 12 hours. BPA-free and leak-proof lid.",
        29.99,
        "Kitchen",
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
        #available,
      ),
    ];

    var id = nextProductId;
    for ((name, desc, price, cat, imgUrl, stock) in samples.values()) {
      let product : Types.Product = {
        id;
        name;
        description = desc;
        price;
        category = cat;
        imageUrl = imgUrl;
        stock;
        createdAt = now;
      };
      products.add(id, product);
      id += 1;
    };
    id;
  };
};
