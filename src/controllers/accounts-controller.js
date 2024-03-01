import { db } from "../models/db.js";

export const accountsController = {
  index: {
    handler: function (request, h) {
        console.log("accounts index handler started")
        return h.view("main", { title: "Welcome to Hotels!" });
    },
  },
  showSignup: {
    handler: function (request, h) {
        console.log("accounts showSignup handler started")
      return h.view("signup-view", { title: "Signup for Hotels!" });
    },
  },
  signup: {
    handler: async function (request, h) {
        console.log("accounts signup handler started")
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    handler: function (request, h) {
        console.log("accounts showLogin handler started")
      return h.view("login-view", { title: "Login to Hotels!" });
    },
  },
  login: {
    handler: async function (request, h) {
        console.log("accounts login handler started")
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
        console.log("accounts logout handler started")
      return h.redirect("/");
    },
  },
};