import { EventEmitter } from "events";
import { assert } from "chai";
import { hotelService } from "../hotel-service.js";
import { assertSubset } from "../test-utils.js";
import { vinc, vincCredentials, testUsers } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
    setup(async () => {
<<<<<<< HEAD
      hotelService.clearAuth();
      await hotelService.createUser(vinc);
      await hotelService.authenticate(vincCredentials);
      await hotelService.deleteAllUsers();
      for (let i = 0; i < testUsers.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        testUsers[i] = await hotelService.createUser(testUsers[i]);
      }
      await hotelService.createUser(vinc);
      await hotelService.authenticate(vincCredentials);
=======
        await hotelService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          users[i] = await hotelService.createUser(testUsers[i]);
        }
>>>>>>> c5796beeb61c5892f061aa2b5910e69772801ad6
      });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await hotelService.createUser(vinc);
    assertSubset(vinc, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await hotelService.getAllUsers();
    await hotelService.deleteAllUsers();
    await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    returnedUsers = await hotelService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await hotelService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
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
        await hotelService.createUser(vinc);
        await hotelService.authenticate(vincCredentials);
        try {
          const returnedUser = await hotelService.getUser(testUsers[0]._id);
          assert.fail("Should not return a response");
        } catch (error) {
          assert(error.response.data.message === "No User with this id");
        }
      });
});

EventEmitter.setMaxListeners(25);