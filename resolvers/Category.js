// import { products } from "../db.js";

export const Category = {
  // parent is the category
  products: (parent, _, contextValue) => {
    const { products } = contextValue;
    return products.filter((product) => product.categoryId === parent.id);
  },
};
