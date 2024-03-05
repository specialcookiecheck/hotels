import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, HotelListArraySpec, HotelListSpec, HotelListSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const hotelListApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const hotelLists = await db.hotelListStore.getAllHotelLists();
        return hotelLists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: HotelListArraySpec, failAction: validationError },
    description: "Get all hotelLists",
    notes: "Returns all hotelLists",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        if (!hotelList) {
          return Boom.notFound("No HotelList with this id");
        }
        return hotelList;
      } catch (err) {
        return Boom.serverUnavailable("No HotelList with this id");
      }
    },
    tags: ["api"],
    description: "Find a HotelList",
    notes: "Returns a hotelList",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: HotelListSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const hotelList = request.payload;
        const newHotelList = await db.hotelListStore.addHotelList(hotelList);
        if (newHotelList) {
          return h.response(newHotelList).code(201);
        }
        return Boom.badImplementation("error creating hotelList");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a HotelList",
    notes: "Returns the newly created hotelList",
    validate: { payload: HotelListSpec, failAction: validationError },
    response: { schema: HotelListSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        if (!hotelList) {
          return Boom.notFound("No HotelList with this id");
        }
        await db.hotelListStore.deleteHotelListById(hotelList._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No HotelList with this id");
      }
    },
    tags: ["api"],
    description: "Delete a hotelList",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAllHotelLists: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.hotelListStore.deleteAllHotelLists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all HotelListApi",
  },
};