import Joi from 'joi';

export const courseValid = (data) => {
    const course = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
      date_period: Joi.number().required(),
      daily_duration: Joi.string().required()
    });
    return course.validate(data);
};
