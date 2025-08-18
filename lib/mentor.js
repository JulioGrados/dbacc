'use strict'

const Mentor = require('../models/mentor')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Mentor.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const mentors = await Mentor.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return mentors
}

const create = async body => {
  try {
    const mentor = await Mentor.create(body)
    return mentor
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (mentorId, body) => {
  const mentor = await Mentor.findOne({ _id: mentorId })

  if (mentor === null) {
    const error = {
      status: 404,
      message: 'El mentor no se encontro'
    }

    throw error
  }

  try {
    const mentor = await Mentor.findOneAndUpdate(
      { _id: mentorId },
      body,
      { new: true }
    )
    return mentor
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const mentor = await Mentor.findOne(query, select).populate(populate)

    if (mentor === null) {
      const error = {
        status: 404,
        message: 'El mentor no se encontro'
      }

      throw error
    }

    return mentor
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async mentorId => {
  const mentor = await Mentor.findOne({ _id: mentorId })

  if (mentor === null) {
    const error = {
      status: 404,
      message: 'El mentor no se encontro'
    }

    throw error
  }

  try {
    await Mentor.deleteOne({ _id: mentorId })

    return mentor
  } catch (errorDB) {
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  create,
  update,
  detail,
  remove
}
