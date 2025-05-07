import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
    is_active: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
