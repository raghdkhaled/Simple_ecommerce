const express = require("express");
const router = express.Router();
const pool = require("../database");
const Joi = require("joi");
const dbControl = require("../dbControl/dbControlCustomer");

router.get("/", async (req, res) => {
  const result = await dbControl.getAllCustomers();
  if (result === -1) {
    return res.status(404).send("No customer found");
  }
  return res.send(result);
});

router.get("/:id", async (req, res) => {
  const customer_id = parseInt(req.params.id);
  const result = await dbControl.getCustomer(customer_id);
  if (result === -1 || result.length === 0) {
    return res.status(404).send("No customer found with this id");
  }
  return res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = req.body;

  const result = await dbControl.addCustomer(customer);
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const customer_id = parseInt(req.params.id);
  const customer = req.body;

  const result = await dbControl.editCustomer(customer, customer_id);
  if (result) return res.status(200).send(customer);
  return res.send("the customer with the given id was not found");
});

router.delete("/:id", async (req, res) => {
  const customer_id = parseInt(req.params.id);
  const result = await dbControl.deleteCustomer(customer_id);
  if (result) return res.status(200).send("customer is deleted");
  return res.send("the customer with the given id was not found");
});

function validateCustomer(customer) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    phone: Joi.string().min(5).required(),
    address: Joi.string().min(5).required(),
  });

  return schema.validate(customer);
}

module.exports = router;
