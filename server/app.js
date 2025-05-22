const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const http = require("http");
const { Server } = require("socket.io");

mongoose
  .connect(process.env.DB_KEY)
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Chyba"));

const indexRouter = require("./routes/index");
const gameRouter = require("./routes/games");
const stripeRouter = require("./routes/stripe");
const userRouter = require("./routes/user");
const storyRouter = require("./routes/stories");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // povolujem jen frontend a backend server
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/games", gameRouter);
app.use("/stripe", stripeRouter);
app.use("/user", userRouter);
app.use("/stories", storyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.SERVER_PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

module.exports = app;
