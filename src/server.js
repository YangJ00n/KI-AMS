import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import groupRouter from "./routers/groupRouter";
import roomRouter from "./routers/roomRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("assets"));
app.use("/images", express.static("src/images"));

app.use("/", rootRouter);
app.use("/groups", groupRouter);
app.use("/rooms", roomRouter);

export default app;
