const Joi = require("joi");
const express = require("express");
const router = express.Router();
const dbControl = require("../dbControl/dbControlProductImages");

// get all images of all products
router.get("/", async (req, res) => {
  const result = await dbControl.getAllImages();
  if (result == -1) res.send("no images found");
  res.send(result);
});

//get images of product by using its id
router.get("/:id", async (req, res) => {

  const id = req.params.id;
  const result = await dbControl.getProductImages(id);

  if (result.length === 0 || result == -1) {
    return res
      .status(404)
      .send("product with the given id is not found or it has no images");
  }
  return res.send(result);
});

// add image to a product
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { error } = validateImage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await dbControl.addImageToProduct(req.body, id);
  if (result.affectedRows === 0)
    return res.status(400).send("the product already has this image");
  res.send(result);
});

// edit  image
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await dbControl.editImage(id, req.body.image);

  if (result.affectedRows === 0)
    return res.status(400).send("there is no image with id " + id);

  res.status(200).send(result);
});

//delete image
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await dbControl.deleteImage(id);
  if (result.affectedRows == 0)
    return res.status(404).send("image with the given id is not found");
  res.status(200).send(result);
});

function validateImage(image) {
  const schema = Joi.object({
    image: Joi.string().required(),
  });

  return schema.validate(image);
}

module.exports = router;
