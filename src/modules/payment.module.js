import mongoose from 'mongoose';
const paynentSchema = new mongoose.Schema(
  {
    payment_method: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      required: true,
    },
    total_amount: { type: Number, required: true },
    enrollment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enrollment',
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paynentSchema);

export default Payment;
