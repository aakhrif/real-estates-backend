const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const propertiesRoutes = require('./src/routes/propertiesRoutes');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const DB_NAME = process.env.MONGO_DATABASE;
const DB_HOST = process.env.MONGO_HOST

// Connect to MongoDB
mongoose
  .connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/properties', propertiesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});