import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().example("homer@simpson.com").required(), // Joi.string().email().example("homer@simpson.com").required(), // removed email for easier testing, should be put back for production
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
    email: Joi.string().required(), // Joi.string().email().required(), // removed email for easier testing, put back for production
    password: Joi.string().required(),
  };
  
export const HotelSpec = {
  name: Joi.string().required(),
  city: Joi.string().required(),
  airport: Joi.string().required(),
};

export const HotelListSpec = {
  title: Joi.string().required(),
};

export const JwtAuth = Joi.object()
.keys({
  success: Joi.boolean().example("true").required(),
  token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
})
.label("JwtAuth");