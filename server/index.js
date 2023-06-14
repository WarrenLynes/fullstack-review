require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../database/index');
const routes = require('./routes');
const { getReposByUsername } = require('../helpers/github.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/repos', routes(db));


let port = process.env.PORT;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
