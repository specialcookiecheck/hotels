import { assert } from "chai";
import { db } from "../src/models/db.js";
import { vinc, testUsers } from "./fixtures.js";

suite("User Model tests", () => {
  setup(async () => {
    db.init("json");
    await db.userStore.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(vinc);
    assert.equal(newUser, vinc);
  });

  test("delete all userApi", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAllUsers();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const user = await db.userStore.addUser(vinc);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("delete One User - success", async () => {
    await db.userStore.deleteUserById(testUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    assert.isNull(deletedUser);
  });

  test("get a user - failures", async () => {
    const noUserWithId = await db.userStore.getUserById("123");
    assert.isNull(noUserWithId);
    const noUserWithEmail = await db.userStore.getUserByEmail("no@one.com");
    assert.isNull(noUserWithEmail);
  });

  test("get a user - bad params", async () => {
    let nullUser = await db.userStore.getUserByEmail("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById();
    assert.isNull(nullUser);
  });

  test("delete One User - fail", async () => {
    const beforeUsers = await db.userStore.getAllUsers();
    await db.userStore.deleteUserById("bad-id");
    const afterUsers = await db.userStore.getAllUsers();
    assert.equal(afterUsers.length, beforeUsers.length);
  });
});