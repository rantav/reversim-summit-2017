import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
  text: String
});

export default mongoose.model('Tag', TagSchema);
