const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  description: String,
  location: {
    postalCode: String,
    city: String,
    neighborhood: String
  },
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  size: Number,
  amentities: Array,
  images: Array,
  contact: {
    name: String,
    email: String,
    phone: String
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
