const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  
  name: {
    type: String,
    enum: [
      'Dog walking',
      'Pet sitting',
      'Animal boarding',
      'Pet grooming'
    ],
    required: true,
  },

  petTypes: {
    type: [String],
    enum: [
      'Dog',
      'Cat',
      'Bird',
      'Guinea pig',
      'Exotic'
    ],
    required: true,
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  image: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
