import Joi from 'joi';

export const lessonsValidation = (data)=>{
    const lessaons = Joi.object({
      lesson: Joi.string().required(),
      course_id: Joi.string().custom(objectId).required(),
    });
    return lessaons.validate(data);
}


