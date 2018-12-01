const express = require('express');
const router = express.Router();
const {hasRole} = require("../custom_middleware/authorization");
const multer  = require('multer');
const {Photo} = require("../common/models/photo");
const storage = multer.memoryStorage();
const fileSize = 5 * 1024 * 1024; // 5Mb
const upload = multer({storage, limits:{fileSize}});

router.post('/', hasRole("owner"), upload.single('file'), async function(req, res) {
  const file = req.file;
  if (!file) {
    return res.status(412).send("No photo sent");
  }
  try {
    const photo = await Photo.create({ownerId: req.user._id, data: file.buffer});
    return res.send(photo._id);
  } catch (error) {
    console.error("Error trying to create image", error);
    return res.status(500).send("Error trying to create image");
  }
});

router.get('/:photoId', async function (req, res) {
  const photoId = req.params.photoId;
  if (!photoId) {
    return res.status(404).send("Must supply ID to find image");
  }
  try {
    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).send(`No image for ID ${photoId}`);
    }
    return res.send(photo.data);
  } catch (error) {
    res.status(500).send("eror fetching image");
  }
});

router.delete('/:photoId', hasRole("owner"), async function (req, res) {
  const photoId = req.params.photoId;
  if (!photoId) {
    return res.status(404).send("Must supply ID to find image");
  }
  try {
    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).send(`No image for ID ${photoId}`);
    }
    if (!photo.ownerId.equals(req.user._id)) {
      return res.status(403).send("Cannot delete a photo you do not own");
    }
    await photo.delete();
    return res.send("Photo deleted");
  } catch (error) {
    console.error("Error while deleting photo", error);
    return res.status(500).send("Unable to delete photo");
  }
});

module.exports = router;