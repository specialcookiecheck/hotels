import { db } from "../models/db.js";

export const dashboardController = {

  index: {
    handler: async function (request, h) {
      console.log("dashboard index handler started");
      const loggedInUser = request.auth.credentials;
      // const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
      const hotelLists = await db.hotelListStore.getUserHotelLists(loggedInUser._id); // auth login
      // const hotelLists = await db.hotelListStore.getAllHotelLists(); originial
      console.log("hotelLists loaded");
      const viewData = {
        title: "Hotel Dashboard",
        user: loggedInUser,
        hotelLists: hotelLists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addHotelList: {
    handler: async function (request, h) {
      console.log("accounts addHotelList handler started");
      const loggedInUser = request.auth.credentials;
      const newHotelList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      console.log("newHotelList payload loaded");
      await db.hotelListStore.addHotelList(newHotelList);
      return h.redirect("/dashboard");
    },
  },
};