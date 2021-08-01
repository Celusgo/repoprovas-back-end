import { Request, Response } from "express";

import * as findTeacherService from "../services/findTeacherService";
import * as findSubjectService from "../services/findSubjectService";
import * as findCategoryService from "../services/findCategoryService";
import * as createTestService from "../services/createTestService";

export async function newTest(req: Request, res: Response){
    const { name,category, teacher, subject, link}: {name: string, category:string, teacher:string, subject:string, link:string } = req.body;
    try{
      const teachers = await findTeacherService.findTeachers(teacher);
      if(!teachers) return res.sendStatus(406);
      const subjects = await findSubjectService.findSubject(subject);
      if(!subjects) return res.sendStatus(406);
      const categories = await findCategoryService.findCategory(category);
      if(!categories) return res.sendStatus(406);
      const newTest = await createTestService.createTest(name, categories.id, teachers.id, subjects.id,  link)
      res.status(201).send(newTest);
  
    } catch(err){
      console.log(err);
      res.sendStatus(500);
    }
  };