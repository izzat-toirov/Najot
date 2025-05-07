import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed'],
      required: true,
    },
    start_date: { type: Date },
    end_date: { type: Date },
  },
  { timestamps: true }
);

const enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default enrollment;
