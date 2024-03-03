import Mongoose from "mongoose";

const { Schema } = Mongoose;

const hotelSchema = new Schema({
  name: String,
  city: String,
  airport: String,
  hotellistid: {
    type: Schema.Types.ObjectId,
    ref: "hotelList",
  },
});

export const Hotel = Mongoose.model("Hotel", hotelSchema);