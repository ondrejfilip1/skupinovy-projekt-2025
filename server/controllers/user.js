const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // password check
    if (password.length < 8 || password.length > 64)
      return res
        .status(500)
        .send({ message: "Password must be 8-64 characters long" });

    // zaeschuju heslo
    const hash = await bcrypt.hash(password, 12);

    // jestli uzivatel uz neexistuje
    const findUser = await User.findOne({ username });
    if (findUser)
      return res.status(500).send({ message: "User already exists" });

    // ulozim uzivatele (isAdmin davam na false protoze se bude nastavovat manualne v databazi)
    const data = new User({
      username: username,
      password: hash,
      isAdmin: false,
    });

    const result = await data.save();
    if (result) {
      // rovnou to uzivatele i prihlasi
      const token = jwt.sign(
        { id: result._id, isAdmin: result.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      return res.status(200).send({
        message: "User created",
        payload: result,
        token,
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
      return res.status(500).send({
        message: "Invalid credentials",
        payload: data,
      });
    }

    const token = jwt.sign(
      { id: data._id, isAdmin: data.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).send({
      token,
      user: { id: data._id, username: data.username, isAdmin: data.isAdmin },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Users found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Users not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "User deleted",
        payload: result,
      });
    }
    res.status(500).send({
      message: "User not deleted",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { password, password_old, username } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password_old, user.password)))
      return res.status(500).send({ message: "Invalid credentials" });

    // password check
    if (password.length < 8 || password.length > 64)
      return res
        .status(500)
        .send({ message: "Password must be 8-64 characters long" });

    // zaeschuju heslo
    const hash = await bcrypt.hash(password, 12);

    const data = {
      password: hash,
    };
    const result = await User.findByIdAndUpdate(user._id, data);
    if (result) {
      return res.status(200).send({
        message: "User password updated",
        payload: result,
      });
    }
    res.status(500).send({
      message: "User password not updated",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.changeUsername = async (req, res, next) => {
  try {
    const { username_new, username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(500).send({ message: "Invalid credentials" });

    const data = {
      username: username_new,
    };
    const result = await User.findByIdAndUpdate(user._id, data);
    if (result) {
      return res.status(200).send({
        message: "User name updated",
        payload: result,
      });
    }
    res.status(500).send({
      message: "User name not updated",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
