import mongoose from 'mongoose';
const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // minlength: [20, 'Description must be atleast 20 characters.'],
      // maxlength: [200, 'Description must be less than 200 characters.'],
      required: true,
    },
    address: {
      type: String,
      required: true,
      // validate: {
      //   validator: {
      //     enum: ['rent', 'sale'],
      //   },
      //   message: '{VALUE} is not allowed.',
      // },
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
      // enum: ['rent', 'sale'],
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
