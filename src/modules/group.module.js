import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    group_type: { type: String, required: true },
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;
