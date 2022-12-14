const Photo = require('../models/photoModel');
const redisClient = require('../redis/redis');

const Query = {
  getPhotos: async (root, { arg }) => {
    try {
      const cacheData = await redisClient.getAsync(arg);

      if (cacheData) return JSON.parse(cacheData);

      const photos = await Photo.find(
        { $text: { $search: arg } },
        { score: { $meta: 'textScore' } },
      ).sort({ score: { $meta: 'textScore' } });

      await redisClient.setAsync(arg, JSON.stringify(photos), 'EX', 60);

      return photos;
    } catch (error) {
      throw error;
    }
  },

  getPhotoById: async (root, { id }) => {
    try {
      const cachedPhoto = await redisClient.getAsync(`photo-${id}`);

      if (cachedPhoto) return JSON.parse(cachedPhoto);

      const photo = await Photo.findOne({ id });

      await redisClient.setAsync(arg, JSON.stringify(photo), 'EX', 60);

      return photo;
    } catch (error) {
      throw error;
    }
  },

  getAllPhotos: async () => {
    try {
      const cachedPhotos = await redisClient.getAsync(`photo-all`);

      if (cachedPhotos) return JSON.parse(cachedPhotos);

      const photos = await Photo.find();

      await redisClient.setAsync(arg, JSON.stringify(photos), 'EX', 60);

      return photos;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { Query };
