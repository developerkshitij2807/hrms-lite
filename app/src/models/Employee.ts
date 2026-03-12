import mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true }
})

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema)