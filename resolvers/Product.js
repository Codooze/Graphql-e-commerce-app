// import { categories } from "../db.js";

const Product = {
  // parent is the product
  category: async (parent, _, contextValue) => {
    const { categories } = contextValue;
    return categories.find((category) => category.id === parent.categoryId);
  },
  reviews: async (parent, _, contextValue) => {
    const { reviews } = contextValue;
    return reviews.filter((review) => review.productId === parent.id);
  },
};

export default Product;
