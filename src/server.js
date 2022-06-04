import express from "express";
import morgan from "morgan";
import { home } from "./controller";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("assets"));
app.use("/images", express.static("src/images"));

app.get("/", home);

export default app;
