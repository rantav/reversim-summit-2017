import mongoose, { Schema } from 'mongoose';

const ProposalSchema = new Schema({
  id          : String,
  title       : String,
  abstract    : String,
  speaker_ids : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  attendees   : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments    : [String],
  tags        : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  editing     : Boolean,
  deleted     : Boolean,
  status      : { type: String, default: 'proposed', enum: ['proposed', 'rejected', 'accepted'] },
  slides_gdrive_id  : String,
  video_url         : String,
  start_time        : Date,
  end_time          : Date,
  hall              : { type: String, enum: [] },
  created_at        : Date,
  updated_at        : Date
});

export default mongoose.model('Proposal', ProposalSchema);