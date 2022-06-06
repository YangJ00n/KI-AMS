import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  attendance: { type: Object, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
