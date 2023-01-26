import { v4 as uuidv4 } from "uuid";

export const Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const newCategory = { id: uuidv4(), ...input };
    categories.push(newCategory);
    return newCategory;
  },
};
//
