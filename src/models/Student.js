import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentID: { type: Number, required: true, unique: true },
  room: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Room" }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
