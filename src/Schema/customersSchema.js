import joi from  'joi' ;

export const customerSchema = joi.object({
    cpf: joi.string().min(11).max(11).required(),
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    birthday: joi.date().required(),
});