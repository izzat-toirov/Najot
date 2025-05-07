import Joi from 'joi';

export const groupValid = (data) => {
  const group = Joi.object({
    name: Joi.string(),
    group_type: Joi.string(),
  });
  return group.validate(data);
};
