const mongoose = require('mongoose');

const schema = mongoose.Schema;

const AppSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imgURl:{
    type: String,
    required: false,
  }
},{timestamps:true});

module.exports = mongoose.model('appdata', AppSchema);
