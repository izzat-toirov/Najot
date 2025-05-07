import mongoose from 'mongoose';

const staff_CourseSchema = new mongoose.Schema(
  {
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
);

const staff_Course = mongoose.model('staff_Course', staff_CourseSchema);

export default staff_Course;
