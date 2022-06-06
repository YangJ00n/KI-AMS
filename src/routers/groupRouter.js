import { Router } from "express";
import {
  groupHome,
  createGroup,
  deleteGroup,
} from "../controllers/groupController";

const groupRouter = Router();

groupRouter.post("/create", createGroup);
groupRouter.route("/:id([0-9a-f]{24})").get(groupHome);
groupRouter.route("/:id([0-9a-f]{24})/delete").get(deleteGroup);

export default groupRouter;
