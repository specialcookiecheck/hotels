import fetch from 'node-fetch';
import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: async function (request, h) {
        console.log("accountsController index handler started")
        const geoAPIKey = process.env.GEO_API_KEY;
        const hotels = await db.hotelStore.getAllHotels();
        const viewData = {
          title: "Welcome to Hotels!",
          hotels: hotels,
          geoAPIKey: geoAPIKey,
        }
        console.log(geoAPIKey);
        const geoAPIFetchURL = `https://api.geoapify.com/v1/geocode/search?text=waldorf%20astoria%20new%20york&lang=en&limit=1&type=amenity&format=json&apiKey=${geoAPIKey}`
        console.log(geoAPIFetchURL);
        const response = await fetch(geoAPIFetchURL);
        const data = await response.json();
        //console.log(data);
        //console.log(data.results[0]);
        viewData.waldorf = data.results[0];
        console.log("accountsController index handler completed, returning")
        return h.view("main", viewData);
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
        console.log("accountsController showSignup handler started")
        console.log("accountsController showSignup handler completed, returning")
        return h.view("signup-view", { title: "Signup for Hotels!" });
    },
  },
  
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        console.log("accountsController signup failAction starting")
        console.log("accountsController signup failAction completed, returning")
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
        console.log("accountsController signup handler started")
        const user = request.payload;
        await db.userStore.addUser(user);
        console.log("accountsController signup handler completed, returning")
        return h.redirect("login");
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
        console.log("accounts showLogin handler started")
        console.log("accountsController showLogin handler completed, returning")
        return h.view("login-view", { title: "Login to Hotels!" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        console.log("accountsController login failAction starting")
        console.log("accountsController login failAction completed, returning")
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
        console.log("accountsController login handler completed, returning")
        if (user.email === process.env.ADMIN_EMAIL) {
          return h.redirect("/admin");
        }
        return h.redirect("/dashboard");
    },
  },
  
  logout: {
      auth: false,
      handler: function (request, h) {
          console.log("accountsController logout handler started")
          request.cookieAuth.clear();
          console.log("accountsController logout handler completed, returning")
          return h.redirect("/");
      },
  },

  async validate(request, session) {
      console.log("accountsController validate started");
      console.log(`session.id: ${session.id}`);
      const user = await db.userStore.getUserById(session.id);
      if (!user) {
        return { isValid: false };
      }
      console.log("accountsController validate completed, returning")
      return { isValid: true, credentials: user };
  },
};