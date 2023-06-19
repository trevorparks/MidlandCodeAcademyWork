// We will run 'node server/index' (without the apostraphes) to start the server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log("App listening at: " + port);
});