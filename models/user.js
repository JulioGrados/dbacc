'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    names: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: Number,
      sparse: true
    },
    mobileCode: {
      default: 51,
      type: Number
    },
    description: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    roles: [
      {
        type: String,
        enum: [
          'Docente',
          'Administrador',
          'Interesado',
          'Estudiante',
          'Cliente',
          'Asesor',
          'Tesorero',
          'Recepcionista'
        ]
      }
    ]
  },
  {
    collection: 'users'
  }
)

UserSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

UserSchema.plugin(mongooseBeautifulUniqueValidation)

UserSchema.index({
  username: 1,
  email: 1,
  names: 1,
})

module.exports = mongoose.model('User', UserSchema)
