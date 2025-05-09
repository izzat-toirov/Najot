import Joi from 'joi';

export const paymentValidation = (data)=>{
    const payment = Joi.object({
      payment_method: Joi.string().required(),
      status: Joi.string().valid('pending', 'completed', 'failed').required(),
      total_amount: Joi.number().required(),
      enrollment_id: Joi.string().required(),
    });
    return payment.validate(data);
}

