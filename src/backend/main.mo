import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Types "types/products-orders";
import ShopInfoTypes "types/shop-info";
import ProductsOrdersApi "mixins/products-orders-api";
import ShopInfoApi "mixins/shop-info-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Types.ProductId, Types.Product>();
  let orders = Map.empty<Types.OrderId, Types.Order>();

  let shopInfoState = { var value : ?ShopInfoTypes.ShopInfo = null };

  include ProductsOrdersApi(accessControlState, products, orders);
  include ShopInfoApi(accessControlState, shopInfoState);
};
