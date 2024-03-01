import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    console.log("getAllUsers started")
    return users;
  },

  async addUser(user) {
    console.log("addUser started")
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    console.log("getUserById started")
    return users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    console.log("getUserByEmail started")
    const returnedUser = users.find((user) => user.email === email);
    console.log(returnedUser);
    //console.log(`returnedUser: ${returnedUser}`); // adding this will generated an error (because of '[Object: null prototype]?)'
    return returnedUser;
  },

  async deleteUserById(id) {
    console.log("deleteUserById started")
    const index = users.findIndex((user) => user._id === id);
    users.splice(index, 1);
  },

  async deleteAllUsers() {
    console.log("deleteAllUsers started")
    users = [];
  },
};