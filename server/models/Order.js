const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]
});

const Order = model('Order', orderSchema);

module.exports = Order;

