import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { hotelService } from "../hotel-service.js";
import { vinc, testHotelLists, testHotels, testHotel } from "../fixtures.js";

suite("Hotel API tests", () => {
  let user = null;
  let favPlaces = null;

  setup(async () => {
    await hotelService.deleteAllHotelLists();
    await hotelService.deleteAllUsers();
    await hotelService.deleteAllHotels();
    user = await hotelService.createUser(vinc);
    testHotelLists[0].userid = user._id;
    favPlaces = await hotelService.createHotelList(testHotelLists[0]);
    console.log(`user: ${user}`);
    console.log(`favPlaces: ${favPlaces}`);
    console.log(favPlaces);
  });

  teardown(async () => {});

  test("create hotel", async () => {
    const returnedHotel = await hotelService.createHotel(favPlaces._id, testHotel);
    console.log(`testHotel: ${testHotel}`);
    console.log(testHotel);
    console.log(`returnedHotel: ${returnedHotel}`);
    console.log(returnedHotel);
    assertSubset(testHotel, returnedHotel);
  });

  test("create Multiple hotels", async () => {
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hotelService.createHotel(favPlaces._id, testHotels[i]);
    }
    const returnedHotels = await hotelService.getAllHotels();
    assert.equal(returnedHotels.length, testHotels.length);
    for (let i = 0; i < returnedHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const hotel = await hotelService.getHotel(returnedHotels[i]._id);
      assertSubset(hotel, returnedHotels[i]);
    }
  });

  test("Delete HotelApi", async () => {
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hotelService.createHotel(favPlaces._id, testHotels[i]);
    };
    let returnedHotels = await hotelService.getAllHotels();
    console.log(`returnedHotels: ${returnedHotels}`);
    console.log(returnedHotels);
    assert.equal(returnedHotels.length, testHotels.length);
    for (let i = 0; i < returnedHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const hotel = await hotelService.deleteHotel(returnedHotels[i]._id);
    }
    returnedHotels = await hotelService.getAllHotels();
    assert.equal(returnedHotels.length, 0);
  });

  test("denormalised hotelList", async () => {
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hotelService.createHotel(favPlaces._id, testHotels[i]);
    }
    const returnedHotelList = await hotelService.getHotelList(favPlaces._id);
    assert.equal(returnedHotelList.hotels.length, testHotels.length);
    for (let i = 0; i < testHotels.length; i += 1) {
      assertSubset(testHotels[i], returnedHotelList.hotels[i]);
    }
  });
});