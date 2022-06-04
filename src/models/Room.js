import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Group" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
