import { Router } from "express";
import { home, createGroup } from "../controllers/groupController";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
} from "../controllers/teacherController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const rootRouter = Router();

rootRouter.route("/").get(home).post(createGroup);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.get("/logout", protectorMiddleware, logout);

export default rootRouter;
