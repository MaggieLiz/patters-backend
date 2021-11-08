import User from '../models/user.js'
import { NotFound } from '../lib/errors.js'

async function createUser(req, res, next) {
  try {
    const newUser = await User.create(req.body)
    return res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
}

async function userIndex(req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function userShow (req, res, next) {
  const { userID } = req.params
  try {
    const foundUser = await User.findById(userID)
    if (!foundUser) throw new NotFound()
    return res.status(200).json(foundUser)
  } catch (err) {
    next(err)
  }
}

async function userEdit(req, res, next) {
  const { userID } = req.params
  try {
    const userToUpdate = await User.findById(userID)
    if (!userToUpdate) {
      throw new NotFound()
    }
    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()
    return res.status(202).json(userToUpdate)
  } catch (err) {
    next(err)
  }
}

async function userDelete(req, res, next) {
  const { userID } = req.params
  try {
    const userToDelete = await User.findById(userID)
    if (!userToDelete) {
      throw new NotFound()
    }
    await userToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  userIndex: userIndex,
  createUser: createUser,
  showUser: userShow,
  editUser: userEdit,
  deleteUser: userDelete,
}