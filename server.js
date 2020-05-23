const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

var flightRoutes = require('./routes/flightRoutes');

//ROUTES
app.use('/', flightRoutes);

app.get('/hi', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
	console.log("Server is running on port:" + port);
})