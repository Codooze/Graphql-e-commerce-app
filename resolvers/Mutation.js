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
};
//
