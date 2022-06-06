import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  col: { type: Number, required: true, default: 5 },
  row: { type: Number, required: true, default: 6 },
  seats: { type: Array, required: true, default: [] },
  group: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Group" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
