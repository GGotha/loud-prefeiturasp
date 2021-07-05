import { celebrate, Joi } from "celebrate";

const validation = celebrate({
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
});

export default validation;
