import { v4 } from "uuid";
import { ref, set, get, child, query, equalTo, orderByChild } from "firebase/database";
import { db } from "./store-utils.js";

const dbRef = ref(db);

export const userFirebaseStore = {

  async addUser(user) {
    console.log("userFirebaseStore addUser started");
    const userId = v4();
    user = Object.setPrototypeOf(user, Object.prototype);
    await set(ref(db, `users/${userId}`), user);
    console.log("userFirebaseStore addUser completed");
    return user;
  },

  async getUserById(id) {
    console.log("userFirebaseStore getUserById started");
    get(child(dbRef, `users/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        returnedUser = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    console.log("userFirebaseStore getUserById completed");
    return returnedUser;
  },

  async getUserByEmail(email) {
    console.log("userFirebaseStore getUserByEmail started");
    console.log(email);
    let returnedUser;

    const usersRef = query(ref(db, "users"), [orderByChild, equalTo(email)]);
    const snapshot = await get(usersRef);
    console.log(snapshot);
    returnedUser = snapshot.val();


    /*
    db.child("users").equalTo(this.getUserByEmail).on("value", (snapshot) => {
      console.log(snapshot.val());
      snapshot.forEach(data => {
          console.log(data.key);
      });
  });
  */
    if (returnedUser === undefined) returnedUser = null;
    console.log(returnedUser);
    console.log("userFirebaseStore getUserByEmail completed");
    return returnedUser;
  },
  /*
  async getAllUsers() {
    console.log("userFirebaseStore getAllUsers started");
    await db.read();
    console.log("userFirebaseStore getAllUsers completed");
    return db.data.users;
  },

  async addUser(user) {
    console.log("userFirebaseStore addUser started");
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    console.log("userFirebaseStore addUser completed");
    return user;
  },

  async getUserById(id) {
    console.log("userFirebaseStore getUserById started");
    await db.read();
    let returnableUser = db.data.users.find((user) => user._id === id);
    if (returnableUser === undefined) returnableUser = null;
    console.log("userFirebaseStore getUserById completed");
    return returnableUser;
  },

  async deleteUserById(id) {
    console.log("userFirebaseStore deleteUserById started");
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    // console.log(`index: ${index}`); // for testing
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
    console.log("userFirebaseStore deleteUserById completed");
  },

  async deleteAllUsers() {
    console.log("userFirebaseStore deleteAllUsers started");
    db.data.users = [];
    await db.write();
    console.log("userFirebaseStore deleteAllUsers completed");
  },
  */
};