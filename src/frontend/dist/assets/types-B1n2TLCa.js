function getOrderStatusLabel(status) {
  if ("pending" in status) return "Pending";
  if ("confirmed" in status) return "Confirmed";
  if ("packed" in status) return "Packed";
  if ("shipped" in status) return "Shipped";
  if ("delivered" in status) return "Delivered";
  return "Unknown";
}
function isInStock(product) {
  return "available" in product.stock;
}
export {
  getOrderStatusLabel as g,
  isInStock as i
};
