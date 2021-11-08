import Pattern from '../models/pattern.js'
import { NotFound } from '../lib/errors.js'

// * COLLECTION REQUESTS

async function patternIndex(_req, res, next) {
  try {
    const patterns = await Pattern.find()
    return res.status(200).json(patterns)
  } catch (err) {
    next(err)
  }
}

async function patternCreate(req, res, next) {
  try {
    const addedPattern = await Pattern.create(req.body)
    return res.status(201).json(addedPattern)
  } catch (err) {
    next(err)
  }
}

// * DETAILS REQUESTS

async function patternShow(req, res, next) {
  const { patternID } = req.params
  try {
    const patternToShow = await Pattern.findById(patternID)
    if (!patternToShow) throw new NotFound()
    return res.status(200).json(patternToShow)
  } catch (err) {
    next(err)
  }
}

async function patternUpdate(req, res, next) {
  const { patternID } = req.params
  try {
    const patternToEdit = await Pattern.findById(patternID)
    if (!patternToEdit) throw new NotFound()
    Object.assign(patternToEdit, req.body)
    await patternToEdit.save()
    return res.status(202).json(patternToEdit)
  } catch (err) {
    next(err)
  }
}

async function patternDelete(req, res, next){
  const { patternID } = req.params
  try {
    const patternToDelete = await Pattern.findById(patternID)
    if (!patternToDelete) throw new NotFound()
    await patternToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// *COMMENT REQUESTS
async function patternCommentCreate(req, res, next) {
  const { patternID } = req.params
  try{
    const patternToComment = await Pattern.findById(patternID)
    if (!patternToComment) throw new NotFound()
    patternToComment.comments.push(req.body)
    await patternToComment.save()
    return res.status(201).json(patternToComment)
  } catch (err) {
    next(err)
  }
}

async function patternCommentDelete(req, res, next) {
  const { patternID, commentID } = req.params
  try {
    const pattern = await Pattern.findById(patternID)
    if (!pattern) throw new NotFound()
    const commentToDelete = pattern.comments.id(commentID)
    if (!commentToDelete) throw new NotFound()
    commentToDelete.remove()
    await pattern.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function patternCommentUpdate(req, res, next) {
  const { patternID, commentID } = req.params
  try { 
    const pattern = await Pattern.findById(patternID)
    if (!pattern) throw new NotFound()
    const commentToUpdate = pattern.comments.id(commentID)
    if (!commentToUpdate) throw new NotFound()
    Object.assign(commentToUpdate, req.body)
    await pattern.save()
    return res.status(202).json(pattern)
  } catch (err) {
    next(err)
  }
}


export default {
  index: patternIndex,
  create: patternCreate,
  show: patternShow,
  update: patternUpdate,
  delete: patternDelete,
  createComment: patternCommentCreate,
  deleteComment: patternCommentDelete,
  updateComment: patternCommentUpdate,
}