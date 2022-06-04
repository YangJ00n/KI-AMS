import { Router } from "express";
import { home, createGroup } from "../controllers/groupController";

const rootRouter = Router();

rootRouter.route("/").get(home).post(createGroup);

export default rootRouter;
