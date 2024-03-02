import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(), // Joi.string().email().required(), // removed email for easier testing, put back for production
  password: Joi.string().required(),
};

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