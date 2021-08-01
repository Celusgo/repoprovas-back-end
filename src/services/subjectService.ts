import { getRepository } from "typeorm";

import Subject from "../entities/Subject";

export async function getSubjects() {
  const subject = await getRepository(Subject).find({
    relations: ["period"]
  });
  
  return subject;
};

