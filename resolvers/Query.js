// import { products, categories } from "../db.js";

export const Query = {
  products: (parent, { filter }, { products }) => {
    if (!filter) return products;
    return products.filter((product) => product.onSale === filter.onSale);
  },
  product: (parent, { id }, { products }) =>
    products.find((product) => product.id === id),
  categories: (parent, _, { categories }) => categories,
  category: (parent, { id }, { categories }) =>
    categories.find((category) => category.id === id),
};
