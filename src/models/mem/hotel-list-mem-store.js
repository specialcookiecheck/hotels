import { v4 } from "uuid";

let hotelLists = [];

export const hotelListMemStore = {
  async getAllHotelLists() {
    console.log("hotelListMemStore started")
    return hotelLists;
  },

  async addHotelList(hotelList) {
    console.log("addHotelList started")
    hotelList._id = v4();
    hotelLists.push(hotelList);
    return hotelList;
  },

  async getHotelListById(id) {
    console.log("getHotelListById started")
    return hotelLists.find((hotelList) => hotelList._id === id);
  },

  async deleteHotelListById(id) {
    console.log("deleteHotelListById started")
    const index = hotelLists.findIndex((hotelList) => hotelList._id === id);
    hotelLists.splice(index, 1);
  },

  async deleteAllHotelLists() {
    console.log("deleteAllHotelList started")
    hotelLists = [];
  },
};