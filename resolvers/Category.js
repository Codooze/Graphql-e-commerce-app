// import { products } from "../db.js";

export const Category = {
  // parent is the category
  products: (parent, { filter }, contextValue) => {
    const { products } = contextValue;
    if (!filter) return products;
    return products.filter(
      (product) =>
        product.categoryId === parent.id && product.onSale === filter.onSale
    );
  },
};
