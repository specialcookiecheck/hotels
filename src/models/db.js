import { userMemStore } from "./mem/user-mem-store.js";
import { hotelListMemStore } from "./mem/hotel-list-mem-store.js";

export const db = {
  userStore: null,
  hotelListStore: null,

  init() {
    this.userStore = userMemStore;
    this.hotelListStore = hotelListMemStore;
  },
};