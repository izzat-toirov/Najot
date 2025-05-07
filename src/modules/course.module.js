import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    date_period: { type: Number, required: true },
    daily_duration: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
