'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const TaskSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    start: {
        type: String
    },
    end: {
        type: String
    },
    color: {
        type: String
    }
  },
  {
    collection: 'tasks'
  }
)

TaskSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TaskSchema.plugin(mongooseBeautifulUniqueValidation)

TaskSchema.index({
    user: 1
})

module.exports = mongoose.model('Task', TaskSchema)
