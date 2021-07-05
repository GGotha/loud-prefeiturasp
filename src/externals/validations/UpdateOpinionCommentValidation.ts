import { celebrate, Joi } from "celebrate";

const validation = celebrate({
  body: Joi.object().keys({
    id_opinion: Joi.number().required(),
    comment: Joi.string().required(),
  }),
});

export default validation;
