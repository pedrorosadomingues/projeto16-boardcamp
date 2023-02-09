import joi from  'joi' ;

export const customerSchema = joi.object({
    cpf: joi.string().length(11).regex(/^\d+$/).required(),
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    birthday: joi.date().required(),
});