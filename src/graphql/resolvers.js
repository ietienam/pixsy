const Photo = require("../models/photoModel");

const Query = {
  getPhotos: async (root, { arg }) => {
    try {
      const photos = await Photo.find(
        { $text: { $search: arg } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
      return photos;
    } catch (err) {
      console.log(err);
    }
  },

  getPhotoById: async (root, { id }) => {
    try {
      const photo = await Photo.findOne({ id });
      return photo;
    } catch (err) {
      console.log(err);
    }
  },

  getAllPhotos: async () => {
    try {
      const photos = await Photo.find();
      return photos;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = { Query };
