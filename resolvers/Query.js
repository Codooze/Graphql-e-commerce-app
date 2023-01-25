// import { products, categories } from "../db.js";

export const Query = {
  products: (parent, _, { products }) => products,
  product: (parent, { id }, { products }) =>
    products.find((product) => product.id === id),
  categories: (parent, _, { categories }) => categories,
  category: (parent, { id }, { categories }) =>
    categories.find((category) => category.id === id),
};
