import { Request, Response } from "express";

import * as findTeacherService from "../services/findTeacherService";
import * as findSubjectService from "../services/findSubjectService";
import * as findCategoryService from "../services/findCategoryService";
import * as createTestService from "../services/createTestService";

import { newTestSchema } from "../schemas/testSchema";

export async function newTest(req: Request, res: Response){
    const { name, category, teacher, subject, link}: {name: string, category:string, teacher:string, subject:string, link:string } = req.body;
    const validate = newTestSchema.validate(req.body);

    if (validate.error) return console.log(validate.error);
    try{
      const teachers = await findTeacherService.findTeachers(teacher);
      if(!teachers) return res.sendStatus(406);
      const subjects = await findSubjectService.findSubject(subject);
      if(!subjects) return res.sendStatus(406);
      const categories = await findCategoryService.findCategory(category);
      if(!categories) return res.sendStatus(406);
      await createTestService.createTest(name, categories.id, teachers.id, subjects.id,  link)
      res.sendStatus(201);
  
    } catch(err){
      console.log(err);
      res.sendStatus(500);
    }
  };