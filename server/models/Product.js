const { Schema, model } = require('mongoose');

const productSchema = new Schema({

    service: {
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
      required: function() {
        return this.service === 'Pet sitting';
      }  
    },

    image: {
        type: String
    },

    price: {
      type: Number,
      required: true,
    },

  }
);

const Product = model('Product', productSchema);

module.exports = Product;
