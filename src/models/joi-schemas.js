import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");
  
export const HotelSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Waldorf Astoria"),
    city: Joi.string().required().example("New York"),
    airport: Joi.string().required().example("JFK"),
    HotelList: IdSpec,
  })
  .label("Hotel");

export const HotelSpecPlus = HotelSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("HotelPlus");

export const HotelArraySpec = Joi.array().items(HotelSpecPlus).label("HotelArray");

export const HotelListSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("My fav places"),
    userid: IdSpec,
    hotels: HotelArraySpec,
  })
  .label("HotelList");

export const HotelListSpecPlus = HotelListSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("HotelListPlus");

export const HotelListArraySpec = Joi.array().items(HotelListSpecPlus).label("HotelListArray");