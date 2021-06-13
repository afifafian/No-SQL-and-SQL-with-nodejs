const jwt = require("jsonwebtoken");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  try {
    const checkAuth = req.headers.authorization;
    if (_.isEmpty(checkAuth)){
      res.status(403).json({
        message: "Invalid access token!"
      })
    } else {
      const token = checkAuth.split(" ")[1];
      if (_.isEmpty(token)) {
        res.status(403).json({
          message: "Invalid access token!"
        })
      } else {
        const decodedJWT = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedJWT;
        next();
      }
    }
  } catch (err) {
    next(err)
  }
};
