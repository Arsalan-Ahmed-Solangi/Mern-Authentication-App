//****ImportingPackages*****//
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const connectDB = require('./database/database');


//****PORT*****//
const port = process.env.PORT || 6000;


//***Middlewares*****//
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))


//***DataBaseConnection****//
connectDB();

//**DefiningRoutes****//
const authRoutes = require('./routes/authRoute');
app.use("/api/auth", authRoutes)


//***TestAPI*****//
app.get("/api", (req, res) => {
    res.send("MERN AUTHENTICATION APP WORKING");
})


//****Listen****//
app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})