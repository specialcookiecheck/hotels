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
  
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> a768ccebcd5b1caced9fb07ad4bb02263a913963
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

<<<<<<< HEAD
export const HotelListArraySpec = Joi.array().items(HotelListSpecPlus).label("HotelListArray");
>>>>>>> c5796beeb61c5892f061aa2b5910e69772801ad6
=======
export const HotelListArraySpec = Joi.array().items(HotelListSpecPlus).label("HotelListArray");
>>>>>>> a768ccebcd5b1caced9fb07ad4bb02263a913963
