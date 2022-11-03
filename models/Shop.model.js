const { Schema, model } = require("mongoose");
const data = require("../seed/seed")

const shopSchema = new Schema(
  {
   name: {
    type: String,
    required: true
   },
   price: {
    type: Number,
    required: true
   },
   image: {
    type: String
   }
  }
);

const Shop = model("Shop", shopSchema);


module.exports = Shop;