import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";


export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
        console.log("accounts index handler started")
        return h.view("main", { title: "Welcome to Hotels!" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
        console.log("accounts showSignup handler started")
        return h.view("signup-view", { title: "Signup for Hotels!" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
        console.log("accounts signup handler started")
        const user = request.payload;
        await db.userStore.addUser(user);
        return h.redirect("login");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
        console.log("accounts showLogin handler started")
        return h.view("login-view", { title: "Login to Hotels!" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
        console.log("accounts login handler started")
        const { email, password } = request.payload;
        const user = await db.userStore.getUserByEmail(email);
        if (!user || user.password !== password) {
          return h.redirect("/");
        }
        request.cookieAuth.set({ id: user._id });
        return h.redirect("/dashboard");
    },
  },
  
  logout: {
    auth: false,
    handler: function (request, h) {
        console.log("accounts logout handler started")
        request.cookieAuth.clear();
        return h.redirect("/");
    },
  },

  async validate(request, session) {
      const user = await db.userStore.getUserById(session.id);
      if (!user) {
        return { isValid: false };
      }
      return { isValid: true, credentials: user };
  },
};