import { db } from "../models/db.js";

export const hotelListController = {
  index: {
    handler: async function (request, h) {
        console.log("hotelListController index handler started")
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        console.log(`hotelList: ${hotelList}`);
        console.log(hotelList);
        const viewData = {
            title: "HotelList",
            hotelList: hotelList,
      };
      return h.view("hotel-list-view", viewData);
    },
  },

  addHotel: {
    handler: async function (request, h) {
        console.log("hotelListController addHotel handler started");
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        console.log(`hotelList: ${hotelList}`);
        console.log(hotelList);
        const newHotel = {
            name: request.payload.name,
            city: request.payload.city,
            airport: request.payload.airport,
        };
        console.log(`newHotel: ${newHotel}`);
        console.log(newHotel);
        await db.hotelStore.addHotel(hotelList._id, newHotel);
        // hotelListController.index();
        return h.redirect(`/hotellist/${hotelList._id}`);
    },
  },
};