// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api');

app.use(cors());
app.use(express.json()); // For parsing application/json

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
