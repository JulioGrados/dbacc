'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const MentorSchema = new Schema(
  {
    names: {
      type: String,
    },
    description: {
      type: String
    },
    photo: {
      type: String
    }
  },
  {
    collection: 'mentors'
  }
)

MentorSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

MentorSchema.plugin(mongooseBeautifulUniqueValidation)

MentorSchema.index({
  names: 1,
})

module.exports = mongoose.model('Mentor', MentorSchema)
