import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, HotelSpec, HotelSpecPlus, HotelArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const hotelApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi find handler started");
      try {
        const hotels = await db.hotelStore.getAllHotels();
        return hotels;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: HotelArraySpec, failAction: validationError },
    description: "Get all hotelApi",
    notes: "Returns all hotelApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      console.log("hotelApi findOne handler started");
      try {
        const hotel = await db.hotelStore.getHotelById(request.params.id);
        if (!hotel) {
          return Boom.notFound("No hotel with this id");
        }
        return hotel;
      } catch (err) {
        return Boom.serverUnavailable("No hotel with this id");
      }
    },
    tags: ["api"],
    description: "Find a Hotel",
    notes: "Returns a hotel",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: HotelSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi create handler started");
      try {
        const hotel = await db.hotelStore.addHotel(request.params.id, request.payload);
        if (hotel) {
          return h.response(hotel).code(201);
        }
        return Boom.badImplementation("error creating hotel");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a hotel",
    notes: "Returns the newly created hotel",
    validate: { payload: HotelSpec },
    response: { schema: HotelSpecPlus, failAction: validationError },
  },

<<<<<<< HEAD
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
=======
  deleteAllHotels: {
    auth: false,
>>>>>>> c5796beeb61c5892f061aa2b5910e69772801ad6
    handler: async function (request, h) {
      console.log("hotelApi deleteAll handler started");
      try {
        await db.hotelStore.deleteAllHotels();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all hotelApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi deleteOne handler started");
      try {
        const hotel = await db.hotelStore.getHotelById(request.params.id);
        console.log(`hotel: ${hotel}`);
        console.log(hotel);
        if (!hotel) {
          return Boom.notFound("No Hotel with this id");
        }
        await db.hotelStore.deleteHotelById(hotel._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Hotel with this id");
      }
    },
    tags: ["api"],
    description: "Delete a hotel",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};