import { Request, Response } from "express";

import * as subjectService from "../services/subjectService";
import * as periodService from "../services/periodService";
import * as teacherSubjectService from "../services/teacherSubjectService";
import * as subjectTeacherService from "../services/subjectTeacherService";
import * as getTestsByIdService from "../services/getTestsByIdService";
import * as getTestsByTeacherAndSubjectIdService from "../services/getTestsByTeacherAndSubjectIdService";

import { idSchema, teacherIdSchema } from "../schemas/idSchema";


export async function getOptions (req: Request, res: Response) {
  try {
    const subjects = await subjectService.getSubjects();
    const periods = await periodService.getPeriods();
    const teacherSubjects = await subjectTeacherService.getSubjectTeachers();
    res.status(200).send({subjects, periods, teacherSubjects});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getTeacherSubject (req: Request, res: Response) {
  try {
    const subjects = await teacherSubjectService.getTeacherSubject();
    res.status(200).send({subjects});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getTestsById (req: Request, res: Response) {
  const id: number = Number(req.params.id);

  const validate = idSchema.validate({id});
  if(validate.error) return res.sendStatus(400);

  try {
    const request = await getTestsByIdService.getById(id);
    res.status(200).send(request);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getTeachersById (req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const teacherId: number = Number(req.params.teacherId);

  const validate = idSchema.validate({id});
  const validateTeacherId = teacherIdSchema.validate({teacherId});

  if(validate.error || validateTeacherId.error) return res.sendStatus(400);

  try {
    const request = await getTestsByTeacherAndSubjectIdService.getAllByTeacherId(id, teacherId);
    if(!request) return res.sendStatus(400);
    return res.status(200).send(request);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};