const Joi = require("joi");
const express = require("express");
const router = express.Router();
const dbControl = require("../dbControl/dbControlProducts");

// get all products
router.get("/", async (req, res) => {
  const result = await dbControl.getAllProducts();
  if (result.length === 0 || result == -1) {
    return res.status(404).send("product with the given id is not found");
  }
  res.send(result);
});

//get a product with id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await dbControl.getProduct(id);

  if (result.length === 0 || result == -1) {
    return res.status(404).send("product with the given id is not found");
  }
  return res.send(result);
});

// add a product
router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await dbControl.insertProduct(req.body);
  res.send(result);
});

// edit a product
router.put("/:id", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await dbControl.editProduct(req.body);
  res.status(200).send(result);
});

//delete a product
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await dbControl.deleteProduct(id);
  if (result == -1)
    return res.status(404).send("product with the given id is not found");
  res.status(200).send(result);
});

function validateProduct(product) {
  const schema = Joi.object({
    id: Joi.string().required(),
    stock: Joi.number().min(3).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(1).max(4096),
    name: Joi.string().min(1).max(100).required(),
  });

  return schema.validate(product);
}

module.exports = router;
