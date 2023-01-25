// import { categories } from "../db.js";

const Product = {
  // parent is the product
  category: async (parent, _, contextValue) => {
    const { categories } = contextValue;
    return categories.find((category) => category.id === parent.categoryId);
  },
};

export default Product;
