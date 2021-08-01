import { getRepository } from "typeorm";

import Tests from "../entities/Tests";

export async function createTest (name:string,  category:number, teacher:number, subject:number, link:string) {
  const categories = await getRepository(Tests).insert({
    name: name,
    categoryId: category,
    teacherId: teacher,
    subjectId:subject,
    link: link
  });
  
  return categories;
}