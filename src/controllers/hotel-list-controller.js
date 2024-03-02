import { db } from "../models/db.js";
import { HotelSpec } from "../models/joi-schemas.js";

export const hotelListController = {
  index: {
    handler: async function (request, h) {
        console.log("hotelListController index handler started")
        console.log(`request.params: ${request.params}`);
        console.log(request.params);
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        console.log(`hotelList: ${hotelList}`);
        // console.log(hotelList); // for testing
        const viewData = {
            title: "HotelList",
            hotelList: hotelList,
      };
      return h.view("hotel-list-view", viewData);
    },
  },

  addHotel: {
    validate: {
      payload: HotelSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        console.log("addHotel failAction started");
        console.log(request.params);
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        console.log(`hotelList: ${hotelList}`);
        // console.log(hotelList); // for testing
        const viewData = {
            title: "Add hotel error",
            hotelList: hotelList,
            errors: error.details,
        };
        console.log("addHotel failAction completed, returning");
        return h.view( "hotel-list-view", viewData ).takeover().code(400);
      },
    },
    handler: async function (request, h) {
        console.log("hotelListController addHotel handler started");
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        //  console.log(`hotelList: ${hotelList}`); // for testing
        //  console.log(hotelList); // for testing
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

  deleteHotel: {
    handler: async function(request, h) {
      console.log("hotelListController deleteHotel handler started");
      const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
      await db.hotelStore.deleteHotel(request.params.hotelid);
      return h.redirect(`/hotellist/${hotelList._id}`);
    },
  },
};