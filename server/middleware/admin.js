// dodelat ochranu pres JWT

module.exports = (req, res, next) => {
  if (req.user.isAdmin) next();
  else return res.status(500).send({ message: "Not admin" });
};