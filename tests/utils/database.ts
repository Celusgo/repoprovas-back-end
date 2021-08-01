import { getRepository } from "typeorm";

import Teacher from "../../src/entities/Teacher";

export async function clearDatabase () {
  await getRepository(Teacher).delete({});
}
