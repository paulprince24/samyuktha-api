const jwt_decode = require("jwt-decode");

function authenticateUser(req, res, next) {
  var token = req.headers.jwt;
  if (token) {
    var decoded = jwt_decode(token);
    if (decoded.email && decoded.email_verified == true) {
      req.user = decoded;
      next();
    } else {
      res.status(500).json({
        status: false,
        msg: "Internal Server Error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      err: "Token not found",
    });
  }
}

module.exports = authenticateUser;
