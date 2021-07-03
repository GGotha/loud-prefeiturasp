import { celebrate, Joi } from "celebrate";

const validation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default validation;
