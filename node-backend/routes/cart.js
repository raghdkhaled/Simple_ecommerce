const express = require("express");
const router = express.Router();
const pool = require("../database");
const Joi = require("joi");
const dbControl = require("../dbControl/dbControlCart");

//get items in customer cart
router.get("/:customer_id", async (req, res) => {
  const customer_id = parseInt(req.params.customer_id);
  const result = await dbControl.getCustomerCart(customer_id);

  console.log(result.length);
  if (result == -1 || !result) {
    return res
      .status(404)
      .send(
        "customer with the given id is not found or it has no items in cart"
      );
  }
  return res.send(result);
});

//add item into customer cart
router.post("/:customer_id", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const item = req.body;
  const customer_id = parseInt(req.params.customer_id);

  const result = await dbControl.addToCart(customer_id, item);
  res.send(result);
});

//edit quantity of an item in the cart of a customer
router.put("/:customer_id", async (req, res) => {
  const customer_id = parseInt(req.params.customer_id);
  const item = req.body;

  const result = await dbControl.editItemQuantityInCart(customer_id, item);
  if (result) return res.status(200).send(item);
  return res.send("the customer with the given id was not found");
});

//reset the entire cart
router.delete("/:customer_id", async (req, res) => {
  const customer_id = parseInt(req.params.customer_id);
  const result = await dbControl.resetCart(customer_id);
  if (result) return res.status(200).send("cart is now empty");
  return res.send("the customer with the given id was not found");
});

//delete an item from customer cart
router.delete("/:id/:customer_id", async (req, res) => {
  const customer_id = parseInt(req.params.customer_id);
  const itemid = req.params.id;
  const result = await dbControl.deleteItemInCart(customer_id, itemid);
  if (result) return res.status(200).send(itemid);
  return res.send(
    "the customer with the given id was not found or product does not exist"
  );
});

function validateItem(item) {
  const schema = Joi.object({
    id: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
  });
  return schema.validate(item);
}

function validateItemid(itemid) {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(item);
}

function validateCustomerId(customer) {
  const schema = Joi.object({
    customer_id: Joi.number().required(),
  });
  return schema.validate(customer);
}

function validateItemid(item) {
  const schema = Joi.object({
    product_id: Joi.string().required(),
  });
  return schema.validate(item);
}

module.exports = router;
