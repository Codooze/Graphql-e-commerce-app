import { products, categories } from "../db.js";

export const Query = {
  products: () => products,
  product: (parent, { id }) => products.find((product) => product.id === id),
  categories: () => categories,
  category: (parent, { id }) =>
    categories.find((category) => category.id === id),
};
