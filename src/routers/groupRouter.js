import { Router } from "express";
import { groupHome, createGroup } from "../controllers/groupController";

const groupRouter = Router();

groupRouter.post("/create", createGroup);
groupRouter.route("/:id([0-9a-f]{24})").get(groupHome);

export default groupRouter;
