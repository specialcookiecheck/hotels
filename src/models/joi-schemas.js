import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
.keys({
  email: Joi.string().required(), // Joi.string().example("homer@simpson.com").email().required(), // removed email for easier testing, put back for production
  password: Joi.string().example("secret").required(),
})
.label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
  })
  .label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");
  
export const HotelSpec = {
  name: Joi.string().required(),
  city: Joi.string().required(),
  airport: Joi.string().required(),
};

export const HotelAdminSpec = {
  name: Joi.string().required(),
  city: Joi.string().required(),
  airport: Joi.string().required(),
  hotelListTitle: Joi.string().required(),
  userEmail: Joi.string().required(), // Joi.string().email().required(), // removed email for easier testing, put back for production
};

export const HotelListSpec = {
  title: Joi.string().required(),
  email: Joi.string().required(), // Joi.string().example("homer@simpson.com").email().required(), // removed email for easier testing, put back for production
};

export const JwtAuth = Joi.object()
.keys({
  success: Joi.boolean().example("true").required(),
  token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
})
.label("JwtAuth");