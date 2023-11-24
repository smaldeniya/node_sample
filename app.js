const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const config = require('./config');

const app = express();

async function start() {
  // Connect to MongoDB
  const mongouri = await config.getUri()
  mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

  // Middleware
  app.use(bodyParser.json());

  // Routes
  app.use('/users', userRoutes);
  app.use('/todos', todoRoutes);

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

(async () => {
  await start()
})();

module.exports = app