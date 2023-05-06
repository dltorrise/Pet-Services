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
        enum: ['dog', 'cat', 'bird', 'guinea pig', 'exotic'],
        required: true,
      },

      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      image: {
        type: String,
      },
    },
  );

const Pet = model('Pet', petSchema);

module.exports = Pet;

