import Joi from 'joi';

export const studentValid = (data) => {
  const student = Joi.object({
    full_name: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^(\+998|998)(9[0-9]|3[3]|8[8])[0-9]{7}$/)
      .required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    group_id: Joi.string().hex().length(24).required(),
    is_active: Joi.boolean().required(),
  });
  return student.validate(data);
};
