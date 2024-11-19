import Joi from 'joi';

const userValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'Name needs to use letters and or numbers',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of {3}',
            'any.required': 'Name is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .messages({
            'string.base': 'Password needs to use letters and or numbers',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should have a minimum length of {6}',
            'any.required': 'Password is required'
        })
});

export default userValidationSchema;