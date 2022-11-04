const { Schema, model } = require("mongoose");

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  species: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  occupation: {
    type: String,
    reqired: true,
  },

  allegiance: {
    type: String,
  },

  weapons: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Character = model("Character", characterSchema);

module.exports = Character;
