import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import groupRouter from "./routers/groupRouter";
import roomRouter from "./routers/roomRouter";
import { localsMiddleware, protectorMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/static", express.static("assets"));
app.use("/images", express.static("src/images"));

app.use("/", rootRouter);
app.use("/groups", protectorMiddleware, groupRouter);
app.use("/rooms", protectorMiddleware, roomRouter);

export default app;
