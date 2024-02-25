const jwt = require("jsonwebtoken");
const productSchema = require("../models/product");

const isAuth = async (req, res, next) => {
  try {
    let token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(404).send({ msg: "No Token Provided" });
    }

    const decodedToken = await jwt.verify(token, "1234564");
    const id = decodedToken.userId;
    const user = await productSchema.findById(id);

    req.user = user;
    next();
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

module.exports = isAuth;
