import Joi from 'joi';

export const lessonsValidation = (data)=>{
    const lessaons = Joi.object({
      lesson: Joi.string().required(),
      course_id: Joi.string().required(),
    });
    return lessaons.validate(data);
}


