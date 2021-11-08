import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

// * Create your Schema here

const commentSchema = new mongoose.Schema(
  {
    wearer: { type: String, required: true },
    size: { type: Number, required: true },
    modifications: { type: String },
    fabric: { type: String },
    fabricType: { type: String },
  },
  {
    timestamps: true
  }
)

const patternSchema = new mongoose.Schema({
  patternMaker: { type: String, required: true },
  patternName: { type: String, required: true },
  garmentType: { type: String, required: true },
  patternImage: { type: String },
  comments: [commentSchema],
})

patternSchema.plugin(mongooseUniqueValidator)

const Pattern = mongoose.model('Pattern', patternSchema)

export default Pattern