import Joi from 'joi';

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const teacherIdSchema = Joi.object({
    teacherId: Joi.number().integer().positive().required()
});

export { idSchema, teacherIdSchema };