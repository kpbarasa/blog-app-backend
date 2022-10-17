const jwt = require("jwt-then");

module.exports = async (req, res, next) => {
  try {

    if (!req.session.token) throw "Forbidden!!";

    const token = req.session.token;

    const payload = await jwt.verify(token, process.env.SECRET);

    req.payload = payload;
    
    next();

  } catch (err) {

    res.status(401).json({
      status:"fail",
      message: "Forbidden 🚫🚫🚫",
    });

  }
};