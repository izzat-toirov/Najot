import Joi from 'joi';

export const staffCourseValid = (data)=>{
    const staff_couse = Joi.object({
      staff_id: Joi.string().custom(objectId).required(),
      course_id: Joi.string().custom(objectId).required(),
    });
    return staff_couse.validate(data);
}


