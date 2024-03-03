import { Hotel } from "./hotel.js";

export const hotelMongoStore = {
  async getAllHotels() {
    const hotels = await Hotel.find().lean();
    return hotels;
  },

  async addHotel(hotelListId, hotel) {
    hotel.hotelListid = hotelListId;
    const newHotel = new Hotel(hotel);
    const hotelObj = await newHotel.save();
    return this.getHotelById(hotelObj._id);
  },

  async getHotelsByHotelListId(id) {
    const hotels = await Hotel.find({ hotelListid: id }).lean();
    return hotels;
  },

  async getHotelById(id) {
    if (id) {
      const hotel = await Hotel.findOne({ _id: id }).lean();
      return hotel;
    }
    return null;
  },

  async deleteHotelById(id) {
    try {
      await Hotel.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllHotels() {
    await Hotel.deleteMany({});
  },

  async updateHotel(hotel, updatedHotel) {
    const hotelDoc = await Hotel.findOne({ _id: hotel._id });
    hotelDoc.title = updatedHotel.title;
    hotelDoc.artist = updatedHotel.artist;
    hotelDoc.duration = updatedHotel.duration;
    await hotelDoc.save();
  },
};