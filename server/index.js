const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const flickrRoutes = require('./routes/api/flickr');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/flickr',flickrRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));
