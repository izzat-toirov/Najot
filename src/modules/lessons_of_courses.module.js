import mongoose from 'mongoose';

const lessonsOfCoursesSchema = new mongoose.Schema(
  {
    lesson: { type: String, required: true },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
);

const lessons = mongoose.model('LessonsOfCourses', lessonsOfCoursesSchema);

export default lessons;
