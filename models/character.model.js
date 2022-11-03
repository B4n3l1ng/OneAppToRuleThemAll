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

  alliengance: {
    type: String,
  },

  money: {
    type: Number,
  },

  weapons: {
    type: String,
  },

  image: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Character = model("Character", characterSchema);

module.exports = Character;
