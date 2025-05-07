import Joi from 'joi';

export const staffValid = (data) => {
  const staff = Joi.object({
    full_name: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^(\+998|998)(9[0-9]|3[3]|8[8])[0-9]{7}$/)
      .required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string()
      .valid('superadmin', 'admin', 'teacher', 'student')
      .default('student'),
    is_active: Joi.string(),
  });
  return staff.validate(data);
};
