import { v4 as uuidv4 } from "uuid";

export const Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const newCategory = { id: uuidv4(), ...input };
    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { products, categories }) => {
    const newProduct = { id: uuidv4(), ...input };

    const category = categories.find(
      //find the category that matches the newProduct's categoryId
      (category) => category.id === newProduct.categoryId
    );
    if (category) products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { productId, input }, { reviews, products }) => {
    console.log("Running addReview");
    const newReview = { id: uuidv4(), ...input };
    const date = new Date();
    newReview.date = date.toDateString();
    newReview.productId = productId;
    const product = products.find(
      //find the product that matches the newReview's productId
      (product) => product.id === productId
    );
    if (product) reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, { id }, { categories, products }) => {
    console.log("Running deleteCategory");
    const categoryIndex = categories.findIndex(
      //find the index of the category that matches the id
      (category) => category.id === id
    );
    if (categoryIndex === -1) return false;
    const deletedCategory = categories.splice(categoryIndex, 1);
    console.log(deletedCategory);
    //products = products.filter((product) => product.categoryId !== id); //remove all products with the deleted category
    products.forEach((product) => {
      //set the categoryId of all products with the deleted category to null
      if (product.categoryId === id) {
        product.categoryId = null;
      }
    });
    return true;
  },
  deleteProduct: (parent, { id }, { products, reviews }) => {
    console.log("Running deleteProduct");
    const productIndex = products.findIndex(
      //find the index of the product that matches the id
      (product) => product.id === id
    );
    if (productIndex === -1) return false;
    const deletedProduct = products.splice(productIndex, 1);
    console.log(deletedProduct);
    reviews = reviews.filter((review) => review.productId !== id); //remove all reviews with the deleted product

    return true;
  },
  deleteReview: (parent, { id }, { reviews }) => {
    console.log("Running deleteReview");
    const reviewIndex = reviews.findIndex(
      //find the index of the review that matches the id
      (review) => review.id === id
    );
    if (reviewIndex === -1) return false;
    const deletedReview = reviews.splice(reviewIndex, 1);
    console.log(deletedReview);
    return true;
  },
};
//
