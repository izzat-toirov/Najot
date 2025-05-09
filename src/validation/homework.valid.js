import Joi from 'joi';

export const homeworkValidation = (data)=>{
    const homework = Joi.object({
      student_id: Joi.string().required(),
      lesson_of_courses_id: Joi.string().required(),
      ball: Joi.number(),
      deadline: Joi.date()
    });
    return homework.validate(data);
};