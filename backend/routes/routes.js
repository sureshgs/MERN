const express = require('express')
const {
  getAllDocs,
  getSingleDoc,
  createDoc,
  deleteDoc,
  updateDoc,
  createFile
} = require('../controllers/AppController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all docs
router.get('/', getAllDocs)

//GET a single doc
router.get('/:id', getSingleDoc)

// POST a new doc
router.post('/', createDoc)

// DELETE a dco
router.delete('/:id', deleteDoc)

// UPDATE a doc
router.patch('/:id', updateDoc)


module.exports = router