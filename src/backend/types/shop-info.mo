module {
  public type ShopInfo = {
    name : Text;
    addressLine1 : Text;
    addressLine2 : ?Text;
    city : Text;
    state : Text;
    pincode : Text;
    phone : Text;
    latitude : ?Float;
    longitude : ?Float;
  };
};
