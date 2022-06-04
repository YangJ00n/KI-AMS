import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
