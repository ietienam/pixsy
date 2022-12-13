const fs = require('fs');
const path = require('path');

const jsonString = fs.readFileSync(path.join(__dirname, '../../photos.json'), 'utf8');
const { photos } = JSON.parse(jsonString);
const Photo = require('../models/photoModel');

module.exports = () => {
  // save the data to the database
  Photo.insertMany(photos, error => {
    if (error) {
      console.log(error);
    } else {
      console.log('Data saved to the database');
    }
  });
};
