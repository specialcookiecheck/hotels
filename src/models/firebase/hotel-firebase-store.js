
import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const hotelJsonStore = {

  async addHotel(hotelListId, hotel) {
    const hotelId = v4();
    hotel.hotelListid = hotelListId;
    hotel = Object.setPrototypeOf(user, Object.prototype);
    await set(ref(db, `hotels/${hotelId}`), hotel);
    return hotel;
  },

  /*
  async getAllHotels() {
    await db.read();
    return db.data.hotels;
  },

  async getHotelsByHotelListId(id) {
    await db.read();
    return db.data.hotels.filter((hotel) => hotel.hotelListid === id);
  },

  async getHotelById(id) {
    await db.read();
    let returnableHotel = db.data.hotels.find((hotel) => hotel._id === id);
    if (returnableHotel === undefined) returnableHotel = null;
    return returnableHotel;
  },

  async deleteHotelById(id) {
    await db.read();
    const index = db.data.hotels.findIndex((hotel) => hotel._id === id);
    if (index !== -1) db.data.hotels.splice(index, 1);
    await db.write();
  },

  async deleteAllHotels() {
    db.data.hotels = [];
    await db.write();
  },

  async updateHotel(hotel, updatedHotel) {
    hotel.name = updatedHotel.name;
    hotel.city = updatedHotel.city;
    hotel.airport = updatedHotel.airport;
    await db.write();
  },
  */
};

