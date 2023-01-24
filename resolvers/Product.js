import { categories } from "../db.js";

export const Product = {
  // parent is the product
  category: (parent) => {
    return categories.find((category) => category.id === parent.categoryId);
  },
};
