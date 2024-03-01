import { userMemStore } from "./mem/user-mem-store.js";
import { hotelListMemStore } from "./mem/hotel-list-mem-store.js";
import { hotelMemStore } from "./mem/hotel-mem-store.js";

export const db = {
  userStore: null,
  hotelListStore: null,
  hotelStore: null,

  init() {
    this.userStore = userMemStore;
    this.hotelListStore = hotelListMemStore;
    this.hotelStore = hotelMemStore;
  },
};