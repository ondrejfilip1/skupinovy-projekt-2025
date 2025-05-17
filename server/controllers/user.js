const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // zaeschuju heslo
    const password = await bcrypt.hash(req.body.password, 12);

    // ulozim uzivatele (isAdmin davam na false protoze se bude nastavovat manualne v databazi)
    const data = new User({
      username: req.body.username,
      password: password,
      isAdmin: false,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        message: "User created",
        payload: result,
      });
    }
    res.status(500).send({
      message: "User not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await User.findOne({ username });
    if (!data || !(await bcrypt.compare(password, data.password))) {
      return res.status(200).send({
        message: "Invalid credentials",
        payload: data,
      });
    }

    const token = jwt.sign(
      { id: data._id, isAdmin: data.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );

    return res
      .status(200)
      .send({ token, user: { id: data._id, username: data.username } });
  } catch (err) {
    return res.status(500).send(err);
  }
};
