const mongoose = require('mongoose');

module.exports = async () => {
  // connect to the database
  await mongoose.connect('mongodb://localhost:27017/my-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch(err => {
    console.log(err);
  });
};
