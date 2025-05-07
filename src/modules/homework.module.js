import mongoose from 'mongoose';

const homeworkSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    lesson_of_courses_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LessonsOfCourses',
      required: true,
    },
    ball: { type: Number },
    deadline: { type: Date },
  },
  { timestamps: true }
);

const homework = mongoose.model('Homework', homeworkSchema);

export default homework;
