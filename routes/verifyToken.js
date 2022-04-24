const jwt = require("jsonwebtoken");

//verify token for each call we make
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json("Access Denied");
  }

  //to set the user throughout all application do req.user(verified)
  try {
    console.log(token);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); //this makes sure that the node process isnt interupted
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Token");
  }
};

//this is going to see that every api call we make has a token inside of it
