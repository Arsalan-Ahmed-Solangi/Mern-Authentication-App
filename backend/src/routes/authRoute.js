//****ImportingPackages*****//
const express = require('express');
const { SignUp } = require('../controllers/authController');
const { SignIn } = require('../controllers/authController');

const { randomQuote } = require('../controllers/QuoteController');
const authToken = require('../middlewares/authMiddleware');
const router = express.Router();

//***SignIn****//
router.post("/signin", SignIn);


//**SignUp****//
router.post("/signup", SignUp);


router.get("/quote",authToken,randomQuote);

module.exports = router;