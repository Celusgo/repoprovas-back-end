import Joi from 'joi';

const newTestSchema = Joi.object({
    name: Joi.string().min(1).required(),
    category: Joi.string().min(1).required(),
    teacher:Joi.string().min(1).required(),
    subject:Joi.string().min(1).required(),
    link: Joi.string().uri().min(1).required()
});

export { newTestSchema };
