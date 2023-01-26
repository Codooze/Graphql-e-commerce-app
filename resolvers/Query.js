// import { products, categories } from "../db.js";

export const Query = {
  products: (parent, { filter }, { products, reviews }) => {
    const { onSale, aveRating } = filter || {};
    // console.log(filter);
    // console.log(products);
    if (onSale) return products.filter((product) => product.onSale === onSale);
    if (aveRating) {
      console.log(reviews);
      const filteredProducts = products.filter((product) => {
        let sumRating = 0;
        let numReviews = 0;
        reviews.forEach((review) => {
          if (review.productId === product.id) {
            sumRating += review.rating;
            numReviews++;
          }
        });
        console.log(sumRating, product.name);
        console.log(numReviews);
        return sumRating / numReviews >= aveRating;
      });
      return filteredProducts;
    }
    return products;
  },
  product: (parent, { id }, { products }) =>
    products.find((product) => product.id === id),
  categories: (parent, _, { categories }) => categories,
  category: (parent, { id }, { categories }) =>
    categories.find((category) => category.id === id),
};
