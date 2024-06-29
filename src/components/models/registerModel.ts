import mongoose, { Schema, Document } from "mongoose";

interface IRegister extends Document {
  email: string;
  password: string;
}

const RegisterSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Register =
  mongoose.models.Register ||
  mongoose.model<IRegister>("Register", RegisterSchema);

export default Register;
