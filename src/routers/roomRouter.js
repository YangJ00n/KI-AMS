import { Router } from "express";
import { createRoom, roomHome } from "../controllers/roomController";

const roomRouter = Router();

roomRouter.post("/create", createRoom);
roomRouter.route("/:id([0-9a-f]{24})").get(roomHome);

export default roomRouter;
