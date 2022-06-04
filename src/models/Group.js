import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Teacher",
  // },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
