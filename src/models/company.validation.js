import Joi from "joi";

export const CompanySchema = Joi.object({
    country: Joi.string()
        .required()
        .description("Country is required."),
    noCommercialRegister: Joi.string()
        .required()
        .description("Commercial register is required."),
    legalName: Joi.string().required().description("Legal name is required."),
    legalLocation: Joi.string()
        .required()
        .description("Legal location is required."),
});