import { v4 } from "uuid";

let hotels = [];

export const hotelMemStore = {
  async getAllHotels() {
    console.log("getAllHotels started")
    return hotels;
  },

  async addHotel(hotelListId, hotel) {
    console.log("addHotel started");
    console.log(`hotel: ${hotel}`);
    console.log(hotel);
    hotel._id = v4();
    hotel.hotelListId = hotelListId;
    console.log(`hotel.hotelListId: ${hotelListId}`)
    hotels.push(hotel);
    console.log(`hotels: ${hotels}`);
    console.log(hotels);
    console.log("addHotel completed");
    return hotel;
  },

  async getHotelsByHotelListId(id) {
    console.log(`getHotelsByHotelListId started: ${id}`)
    console.log(`hotels: ${hotels}`);
    console.log(hotels);
    const filteredHotels = hotels.filter((hotel) => hotel.hotelListId === id);
    console.log(`filteredHotels: ${filteredHotels}`);
    console.log(filteredHotels);
    return filteredHotels;
  },

  async getHotelById(id) {
    console.log("getHotelById started")
    return hotels.find((hotel) => hotel._id === id);
  },

  async getHotelListHotels(hotellistId) {
    console.log("getHotelListHotels started")
    return hotels.filter((hotel) => hotel.hotellistid === hotellistId);
  },

  async deleteHotel(id) {
    console.log("deleteHotel started")
    const index = hotels.findIndex((hotel) => hotel._id === id);
    hotels.splice(index, 1);
  },

  async deleteAllHotels() {
    console.log("deleteAllHotels started")
    hotels = [];
  },

  async updateHotel(hotel, updatedHotel) {
    console.log("updateHotel started")
    hotel.name = updatedHotel.name;
    hotel.city = updatedHotel.city;
    hotel.airport = updatedHotel.airport;
  },
};