import mongoose from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

// middleware which execute before "save"
teacherSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
