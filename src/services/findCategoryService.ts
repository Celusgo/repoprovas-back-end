import { getRepository } from "typeorm";

import Category from "../entities/Category";

export async function findCategory (category: string) {
  const categories = await getRepository(Category).findOne({
    name: category
  });
  
  return categories;
}