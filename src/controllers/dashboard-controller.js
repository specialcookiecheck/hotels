import { db } from "../models/db.js";

export const dashboardController = {

  index: {
    handler: async function (request, h) {
      console.log("dashboard index handler started");
      const hotelLists = await db.hotelListStore.getAllHotelLists();
      console.log("hotelLists loaded");
      const viewData = {
        title: "Hotel Dashboard",
        hotelLists: hotelLists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addHotelList: {
    handler: async function (request, h) {
      console.log("accounts addHotelList handler started");
      const newHotelList = {
        title: request.payload.title,
      };
      console.log("newHotelList payload loaded");
      await db.hotelListStore.addHotelList(newHotelList);
      return h.redirect("/dashboard");
    },
  },
};