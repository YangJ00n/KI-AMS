import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(logger);
app.use("/static", express.static("assets"));
app.use("/images", express.static("src/images"));

app.get("/", (_, res) => res.render("home"));

export default app;
