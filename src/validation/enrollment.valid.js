import Joi from 'joi';

export const enrollmentValidation =(data)=>{
    const enrollment = Joi.object({
      student_id: Joi.string().custom(objectId).required(),
      course_id: Joi.string().custom(objectId).required(),
      status: Joi.string().valid('pending', 'active', 'completed').required(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
    });
    return enrollment.validate(data);
}

