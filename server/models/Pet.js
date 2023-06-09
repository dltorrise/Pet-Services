const { Schema, model } = require('mongoose');

const petSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      
      breed: {
        type: String,
        required: true,
      },

      age: {
        type: Number,
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      owner: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
      },
    },
  );

const Pet = model('Pet', petSchema);

module.exports = Pet;

