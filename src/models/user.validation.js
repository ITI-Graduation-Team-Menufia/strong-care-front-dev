import Joi from "joi";

export const userSchema = Joi.object({
    // firstName: Joi.string().trim().min(2).required(),
    lastName: Joi.string().trim().min(2).required(),
    email: Joi.string().required().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().required(),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    // role: Joi.string().valid('company', 'admin', 'individual', 'compensationDepart', 'insuranceRequestsDepart').required(),
    // latitude: Joi.string()
    //     .required()
    //     .min(0).max(90),
    // longitude: Joi.string()
    //     .required()
    //     .min(0).max(90),
});
export const userِAddSchema = Joi.object({
    firstName: Joi.string().trim().min(2).required(),
    lastName: Joi.string().trim().min(2).required(),
    email: Joi.string().required().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().required(),
    password: Joi.string().required().min(8),
    role: Joi.string().valid('admin', 'compensationDepart', 'insuranceRequestsDepart').required(),
});
export const userِEditSchema = Joi.object({
    firstName: Joi.string().trim().min(2).required(),
    lastName: Joi.string().trim().min(2).required(),
});