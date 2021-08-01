import { getRepository } from "typeorm";

import Subject from "../entities/Subject";

export async function findSubject (subject:string) {
  const subjects = await getRepository(Subject).findOne({
    name: subject
  });
  
  return subjects;
}
