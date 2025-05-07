import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'teacher', 'student'],
      default: 'student',
      required: true,
    },
    is_active: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
