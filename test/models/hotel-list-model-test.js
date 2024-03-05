import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { assertSubset } from "../test-utils.js";
import { testHotelLists, testHotel } from "../fixtures.js";

suite("HotelLists Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.hotelListStore.deleteAllHotelLists();
    for (let i = 0; i < testHotelLists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testHotelLists[i] = await db.hotelListStore.addHotelList(testHotelLists[i]);
    }
  });

  test("create a hotelList", async () => {
    const hotelList = await db.hotelListStore.addHotelList(testHotelLists);
    assertSubset(testHotel, hotelList);
    assert.isDefined(hotelList._id);
  });

  test("delete all hotelLists", async () => {
    let returnedHotelLists = await db.hotelListStore.getAllHotelLists();
    assert.equal(returnedHotelLists.length, 3);
    await db.hotelListStore.deleteAllHotelLists();
    returnedHotelLists = await db.hotelListStore.getAllHotelLists();
    assert.equal(returnedHotelLists.length, 0);
  });

  test("get a hotelList - success", async () => {
    const hotelList = await db.hotelListStore.addHotelList(testHotel);
    const returnedHotelList = await db.hotelListStore.getHotelListById(hotelList._id);
    assertSubset(testHotel, hotelList);
  });

  test("delete One HotelList - success", async () => {
    const id = testHotelLists[0]._id;
    await db.hotelListStore.deleteHotelListById(id);
    const returnedHotelLists = await db.hotelListStore.getAllHotelLists();
    assert.equal(returnedHotelLists.length, testHotelLists.length - 1);
    const deletedHotelList = await db.hotelListStore.getHotelListById(id);
    assert.isNull(deletedHotelList);
  });

  test("get a hotelList - bad params", async () => {
    assert.isNull(await db.hotelListStore.getHotelListById(""));
    assert.isNull(await db.hotelListStore.getHotelListById());
  });

  test("delete One HotelList - fail", async () => {
    await db.hotelListStore.deleteHotelListById("bad-id");
    const allHotelLists = await db.hotelListStore.getAllHotelLists();
    assert.equal(testHotelLists.length, allHotelLists.length);
  });
});

EventEmitter.setMaxListeners(25);