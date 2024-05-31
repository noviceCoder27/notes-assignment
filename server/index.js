const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');
const routeHandler = require('./middlewares/routeHandler');
const connectToDatabase = require('./utils/connectDb');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res) => {
    res.status(200).json({msg: "Server is running"})
})
app.use('/tasks',taskRoutes);
app.use(routeHandler);
app.use(errorHandler);

connectToDatabase(app);

