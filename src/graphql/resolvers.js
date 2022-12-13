const Photo = require("../models/photoModel");

const Query = {
  getPhotos: async (root, { arg }) => {
    try {
      return await Photo.find(
        { $text: { $search: arg } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
    } catch (err) {
      console.error(err);
    }
  },

  getPhotoById: async (root, { id }) => {
    try {
      return await Photo.findOne({ id });
    } catch (err) {
      console.error(err);
    }
  },

  getAllPhotos: async () => {
    try {
        return await Photo.find();
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = { Query };
