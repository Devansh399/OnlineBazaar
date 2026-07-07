const moongose = require("mongoose");

const orderSchema = new moongose.Schema(
  {
    user: { type: moongose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        productId: {
          type: moongose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },
    
    address: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentId: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },

  },

  { timestamps: true },
);

module.exports = moongose.model("Order", orderSchema);


