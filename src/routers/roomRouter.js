import { Router } from "express";
import {
  createRoom,
  roomHome,
  deleteRoom,
  setSeats,
} from "../controllers/roomController";

const roomRouter = Router();

roomRouter.post("/create", createRoom);
roomRouter.route("/:id([0-9a-f]{24})").get(roomHome);
roomRouter.route("/:id([0-9a-f]{24})/delete").get(deleteRoom);
roomRouter.route("/:id([0-9a-f]{24})/seats").post(setSeats);

export default roomRouter;
