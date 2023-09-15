import mongoose from 'mongoose'

/* ABTestSchema will correspond to a collection in your MongoDB database. */
const ABTestSchema = new mongoose.Schema({
  uid: {
    /* Unique 5 char string for dynamic route id */
    type: String,
    required: [true, 'Please check the id generator.'],
    maxlength: [60, 'id cannot be more than 60 characters'],
  },
  prompt: {
    /* Prompt string */
    type: String,
    required: [true, "Please provide a prompt"],
    maxlength: [60, "Prompt cannot be more than 60 characters"],
  },
  embedA: {
    /* First embed link */
    type: String,
    required: [true, 'Please specify the first embed link for your test.'],
    maxlength: [300, 'link cannot be more than 300 characters'],
  },
  embedB: {
    /* Second embed link */
    type: String,
    required: [true, 'Please specify the second embed link for your test.'],
    maxlength: [300, 'link cannot be more than 300 characters'],
  },
  aRes: {
    /* Number of votes for A */
    type: Number,
  },
  bRes: {
    /* Number of votes for B */
    type: Number,
  }
},
{ timestamps: { createdAt: true } })

//expire documents after ~3 days
ABTestSchema.index({createdAt: 1},{expireAfterSeconds: 270000})

export default mongoose.models.ABTest || mongoose.model('ABTest', ABTestSchema)