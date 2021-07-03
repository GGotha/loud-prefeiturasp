import { celebrate, Joi } from "celebrate";

const validation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required(),
  }),
});

export default validation;
