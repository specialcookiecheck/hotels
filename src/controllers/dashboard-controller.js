import { db } from "../models/db.js";
import { HotelListSpec } from "../models/joi-schemas.js";

export const dashboardController = {

  index: {
    handler: async function (request, h) {
      console.log("dashboardController index handler started");
      const loggedInUser = request.auth.credentials;
      console.log(loggedInUser);
      // const hotelLists = await db.hotelListStore.getUserHotelLists(loggedInUser._id);
      const hotelLists = await db.hotelListStore.getUserHotelLists(loggedInUser._id); // auth login
      // const hotelLists = await db.hotelListStore.getAllHotelLists(); originial
      console.log("hotelLists loaded");
      const viewData = {
        title: "Hotel Dashboard",
        user: loggedInUser,
        hotelLists: hotelLists,
      };
      console.log("dashboardController index handler completed, returning")
      return h.view("dashboard-view", viewData);
    },
  },

  addHotelList: {
    validate: {
      payload: HotelListSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        console.log("dashboardController addHotelList failAction started");
        const loggedInUser = request.auth.credentials;
        const hotelLists = await db.hotelListStore.getUserHotelLists(loggedInUser._id);
        console.log(`hotelLists: ${hotelLists}`);
        const viewData = {
            title: "Add HotelList error",
            hotelLists: hotelLists,
            errors: error.details,
        };
        console.log("dashboardController addHotelList failAction completed, returning");
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      console.log("dashboardController addHotelList handler started");
      const loggedInUser = request.auth.credentials;
      const newHotelList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      // console.log("dashboardController newHotelList payload loaded");
      await db.hotelListStore.addHotelList(newHotelList);
      console.log("dashboardController addHotelList handler completed, returning");
      return h.redirect("/dashboard");
    },
  },

  deleteHotelList: {
    handler: async function (request, h) {
      console.log("dashboardController deleteHotelList handler started");
      const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
      await db.hotelListStore.deleteHotelListById(hotelList._id);
      console.log("dashboardController deleteHotelList handler completed, returning");
      return h.redirect("/dashboard");
    },
  },
};