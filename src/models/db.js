import { userMemStore } from "./mem/user-mem-store.js";
import { hotelListMemStore } from "./mem/hotel-list-mem-store.js";
import { hotelMemStore } from "./mem/hotel-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { hotelListJsonStore } from "./json/hotel-list-json-store.js";
import { hotelJsonStore } from "./json/hotel-json-store.js";


export const db = {
  userStore: null,
  hotelListStore: null,
  hotelStore: null,

  init(dbType) {
    switch (dbType) {
      case "json":
        this.userStore = userJsonStore;
        this.hotelListStore = hotelListJsonStore; 
        this.hotelStore = hotelJsonStore; 
        break;
      default:
        this.userStore = userMemStore;
        this.hotelListStore = hotelListMemStore;
        this.hotelStore = hotelMemStore;
    }
  },
};