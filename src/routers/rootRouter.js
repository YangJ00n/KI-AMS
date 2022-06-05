import { Router } from "express";
import { home } from "../controllers/groupController";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
} from "../controllers/teacherController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const rootRouter = Router();

rootRouter.get("/", home);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.get("/logout", protectorMiddleware, logout);

export default rootRouter;
