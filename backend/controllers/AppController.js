const collections = require('../models/AppModel');
const mongoose = require("mongoose")

// get all data
const getAllDocs = async (req, res) => {
  const user_id = req.user._id;

  const fetchedData = await collections.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(fetchedData);
};

// get a single data
const getSingleDoc = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such data' });
  }

  const fetchedData = await collections.findById(id);

  if (!fetchedData) {
    return res.status(404).json({ error: 'No such data' });
  }

  res.status(200).json(fetchedData);
};

// create new doc
const createDoc = async (req, res) => {
  const {title, type, desc, imgURL} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!type) {
    emptyFields.push('type')
  }
  if(!desc) {
    emptyFields.push('desc')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const createdData = await collections.create({title, type, desc, imgURL, user_id})
    res.status(200).json(createdData)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



// delete a doc
const deleteDoc = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such data exists' });
  }

  const deletedDoc = await collections.findOneAndDelete({ _id: id });

  if (!deletedDoc) {
    return res.status(400).json({ error: 'No such data' });
  }

  res.status(200).json(deletedDoc);
};

// update a doc
const updateDoc = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such data' });
  }

  const updatedDoc = await collections.findOneAndUpdate({ _id: id }, {
    ...req.body
  });

  if (!updatedDoc) {
    return res.status(400).json({ error: 'No such data exists' });
  }

  res.status(200).json(updatedDoc);
};

module.exports = {
  getAllDocs,
  getSingleDoc,
  createDoc,
  deleteDoc,
  updateDoc
};
