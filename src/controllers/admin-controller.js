import { db } from "../models/db.js";
import { HotelAdminSpec, UserSpec, HotelListSpec } from "../models/joi-schemas.js";


export const adminController = {
    index: {
      handler: async function (request, h) {
        console.log("adminController index handler started")
        const loggedInUser = request.auth.credentials;
        const viewData = {
          title: "Admin Dashboard",
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController index handler completed, returning")
        return h.view("admin-dashboard-view", viewData);
      },
    },

    listAllUsersIndex: {
      handler: async function (request, h) {
        console.log("adminController listAllUsersIndex handler started")
        const loggedInUser = request.auth.credentials;
        const userList = await db.userStore.getAllUsers();
        const viewData = {
          title: "Admin Users",
          userList: userList,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listAllUsersIndex handler completed, returning")
        return h.view("admin-users-view", viewData);
      },
    },

    listAllHotelListsIndex: {
      handler: async function (request, h) {
        console.log("adminController listAllHotelListsIndex handler started")
        const loggedInUser = request.auth.credentials;
        const hotelLists = await db.hotelListStore.getAllHotelLists();
        console.log("hotelLists:");
        console.log(hotelLists);
        const viewData = {
          title: "Admin Hotel Lists",
          hotelLists: hotelLists,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listAllHotelListsIndex handler completed, returning")
        return h.view("admin-hotel-lists-view", viewData);
      },
    },

    listAllHotelsIndex: {
      handler: async function (request, h) {
        console.log("adminController listAllHotelsIndex handler started")
        const loggedInUser = request.auth.credentials;
        const hotelLists = await db.hotelListStore.getAllHotelLists();
        for (let i = 0; i < hotelLists.length; i++) {
          console.log(`i: ${i}`);
          console.log(hotelLists[i]._id);
          hotelLists[i].hotels = await db.hotelStore.getHotelsByHotelListId(hotelLists[i]._id);
          console.log(hotelLists[i]);
        }
        // const hotels = await db.hotelStore.getAllHotels();
        const viewData = {
          title: "Admin Hotels",
          hotelLists: hotelLists,
          displayHotels: true,
          // hotels: hotels,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listAllHotelsIndex handler completed, returning")
        return h.view("admin-hotels-view", viewData);
      },
    },

    addHotel: {
      validate: {
        payload: HotelAdminSpec,
        options: { abortEarly: false },
        failAction: async function (request, h, error) {
          console.log("adminController addHotel failAction started");
          console.log(request.params);
          const hotelLists = await db.hotelListStore.getAllHotelLists();
          for (let i = 0; i < hotelLists.length; i++) {
            console.log(`i: ${i}`);
            console.log(hotelLists[i]._id);
            hotelLists[i].hotels = await db.hotelStore.getHotelsByHotelListId(hotelLists[i]._id);
            console.log(hotelLists[i]);
          }
          const viewData = {
              title: "Add hotel error",
              hotelLists: hotelLists,
              errors: error.details,
              displayHotels: true,
          };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
          }
          console.log(`viewData listId: ${viewData.listId}`);
          console.log("adminController addHotel failAction completed, returning");
          return h.view( "admin-hotels-view", viewData ).takeover().code(400);
        },
      },
      handler: async function (request, h) {
          console.log("adminController addHotel handler started");
          const hotelList = await db.hotelListStore.getHotelListById(request.payload.hotelListId);
          console.log(hotelList);
          //  console.log(`hotelList: ${hotelList}`); // for testing
          //  console.log(hotelList); // for testing
          const newHotel = {
              name: request.payload.name,
              city: request.payload.city,
              airport: request.payload.airport,
          };
          console.log(`newHotel: ${newHotel}`);
          console.log(newHotel);
          await db.hotelStore.addHotel(request.payload.hotelListId, newHotel);
          // hotelListController.index();
          console.log("adminController addHotel handler completed, returning");
          return h.redirect("/admin/hotels");
      },
    },

    addUser: {
      validate: {
        payload: UserSpec,
        options: { abortEarly: false },
        failAction: async function (request, h, error) {
          console.log("adminController addUser failAction started")
          const userList = await db.userStore.getAllUsers();
          console.log("Setting viewData");
          const viewData = {
            title: "Add user error",
            userList: userList,
            errors: error.details,
          };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
          }
          console.log("adminController addUser failAction completed, returning")
          return h.view("admin-users-view", viewData ).takeover().code(400);
        },
      },
      handler: async function (request, h) {
          console.log("adminController addUser handler started")
          const user = request.payload;
          await db.userStore.addUser(user);
          console.log("adminController addUser handler completed, returning")
          return h.redirect("/admin/users");
      },
    },

    addHotelList: {
      validate: {
        payload: HotelListSpec,
        options: { abortEarly: false },
        failAction: async function (request, h, error) {
          console.log("adminController addHotelList failAction started");
          const hotelLists = await db.hotelListStore.getAllHotelLists();
          console.log(`hotelLists: ${hotelLists}`);
          const viewData = {
              title: "Add HotelList error",
              hotelLists: hotelLists,
              errors: error.details,
            };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
              viewData.admin = true;
          }
          console.log("adminController addHotelList failAction completed, returning");
          return h.view("admin-hotel-lists-view", viewData).takeover().code(400);
        },
      },
      handler: async function (request, h) {
        console.log("adminController addHotelList handler started");
        const userEmail = request.payload.email;
        console.log(`userEmail: ${userEmail}`);
        const user = await db.userStore.getUserByEmail(userEmail);
        const newHotelList = {
          userid: user._id,
          title: request.payload.title,
        };
        // console.log("adminController newHotelList payload loaded");
        await db.hotelListStore.addHotelList(newHotelList);
        console.log("adminController addHotelList handler completed, returning");
        return h.redirect("/admin/hotellists");
      },
    },

    deleteHotel: {
      handler: async function(request, h) {
        console.log("adminController deleteHotel handler started");
        console.log(`request.params.id: ${request.params.id}`);
        await db.hotelStore.deleteHotelById(request.params.id);
        console.log("adminController deleteHotel handler completed, returning");
        return h.redirect("/admin/hotels");
      },
    },

    deleteUser: {
      handler: async function(request, h) {
        console.log("adminController deleteHotel handler started");
        console.log(`request.params.id: ${request.params.id}`);
        await db.userStore.deleteUserById(request.params.id);
        console.log("adminController deleteHotel handler completed, returning");
        return h.redirect("/admin/users");
      },
    },

    deleteHotelList: {
      handler: async function (request, h) {
        console.log("adminController deleteHotelList handler started");
        console.log(`request.params.id: ${request.params.id}`);
        await db.hotelListStore.deleteHotelListById(request.params.id);
        console.log("adminController deleteHotelList handler completed, returning");
        return h.redirect("/admin/hotellists");
      },
    },

    deleteAllHotels: {
      handler: async function(request, h) {
        console.log("adminController deleteAllHotels handler started");
        await db.hotelStore.deleteAllHotels();
        console.log("adminController deleteAllHotels handler completed, returning");
        return h.redirect("/admin/hotels");
      },
    },

    deleteAllUsers: {
      handler: async function(request, h) {
        console.log("adminController deleteAllUsers handler started");
        await db.userStore.deleteAllUsers();
        console.log("adminController deleteAllUsers handler completed, returning");
        return h.redirect("/admin/users");
      },
    },

    deleteAllHotelLists: {
      handler: async function (request, h) {
        console.log("adminController deleteAllHotelLists handler started");
        await db.hotelListStore.deleteAllHotelLists();
        console.log("adminController deleteAllHotelLists handler completed, returning");
        return h.redirect("/admin/hotellists");
      },
    },
  };