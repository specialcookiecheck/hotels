import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testHotels, testHotel } from "./fixtures.js";

suite("Hotels Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.hotelStore.deleteAllHotels();
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testHotels[i] = await db.hotelStore.addHotel("newlistIdblable", testHotels[0]);
    }
  });

  test("create a hotel", async () => {
    const hotel = await db.hotelStore.addHotel("newlistIdblable", testHotel );
    assert.equal(testHotel.name, hotel.name);
    assert.isDefined(hotel._id);
  });

  test("delete all hotels", async () => {
    let returnedHotels = await db.hotelStore.getAllHotels();
    assert.equal(returnedHotels.length, 3);
    await db.hotelStore.deleteAllHotels();
    returnedHotels = await db.hotelStore.getAllHotels();
    assert.equal(returnedHotels.length, 0);
  });

  test("get a hotel - success", async () => {
    const hotel = await db.hotelStore.addHotel("newlistIdblable", testHotel );
    const returnedHotel = await db.hotelStore.getHotelById(hotel._id);
    assert.equal(testHotel, hotel);
  });

  test("delete One Hotel - success", async () => {
    const id = testHotels[0]._id;
    await db.hotelStore.deleteHotelById(id);
    const returnedHotels = await db.hotelStore.getAllHotels();
    assert.equal(returnedHotels.length, testHotels.length - 1);
    const deletedHotel = await db.hotelStore.getHotelById(id);
    assert.isNull(deletedHotel);
  });

  test("get a hotel - bad params", async () => {
    assert.isNull(await db.hotelStore.getHotelById(""));
    assert.isNull(await db.hotelStore.getHotelById());
  });

  test("delete One Hotel - fail", async () => {
    await db.hotelStore.deleteHotelById("bad-id");
    const allHotels = await db.hotelStore.getAllHotels();
    assert.equal(testHotels.length, allHotels.length);
  });
});