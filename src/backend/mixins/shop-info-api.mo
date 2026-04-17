import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/shop-info";
import ShopInfoLib "../lib/shop-info";

mixin (
  accessControlState : AccessControl.AccessControlState,
  shopInfo : { var value : ?Types.ShopInfo },
) {

  // Seed default shop info if none set
  if (shopInfo.value == null) {
    shopInfo.value := ?ShopInfoLib.defaultShopInfo();
  };

  public query func getShopInfo() : async ?Types.ShopInfo {
    shopInfo.value;
  };

  public shared ({ caller }) func setShopInfo(info : Types.ShopInfo) : async () {
    let isAdmin = switch (accessControlState.userRoles.get(caller)) {
      case (? #admin) { true };
      case (_) { false };
    };
    if (not isAdmin) {
      Runtime.trap("Unauthorized: owner only");
    };
    shopInfo.value := ?info;
  };
};
