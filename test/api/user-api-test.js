import { assert } from "chai";
import { hotelService } from "../hotel-service.js";
import { assertSubset } from "../test-utils.js";
import { vinc, testUsers } from "../fixtures.js";

suite("User API tests", () => {
    setup(async () => {
        await hotelService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          testUsers[i] = await hotelService.createUser(testUsers[i]);
        }
      });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await hotelService.createUser(vinc);
    assertSubset(vinc, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await hotelService.getAllUsers();
    // assert.equal(returnedUsers.length, 3);
    await hotelService.deleteAllUsers();
    returnedUsers = await hotelService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await hotelService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - fail", async () => {
    try {
        const returnedUser = await hotelService.getUser("1234");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No User with this id");
      };
    });

    test("get a user - deleted user", async () => {
        await hotelService.deleteAllUsers();
        try {
          const returnedUser = await hotelService.getUser(testUsers[0]._id);
          assert.fail("Should not return a response");
        } catch (error) {
          assert(error.response.data.message === "No User with this id");
        }
      });
});