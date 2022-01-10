const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ]
  },
  //timestamp will provide by the mongoose to capture the exact time
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
