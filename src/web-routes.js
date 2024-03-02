import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { hotelListController } from "./controllers/hotel-list-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addhotellist", config: dashboardController.addHotelList },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/hotellist/{id}", config: hotelListController.index },
  { method: "POST", path: "/hotellist/{id}/addhotel", config: hotelListController.addHotel },

  { method: "GET", path: "/dashboard/deletehotellist/{id}", config: dashboardController.deleteHotelList },
  { method: "GET", path: "/hotellist/{id}/deletehotel/{hotelid}", config: hotelListController.deleteHotel },
];