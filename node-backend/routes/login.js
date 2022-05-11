const express = require("express");
const router = express.Router();
const pool = require("../database");
const Joi = require("joi");
const dbControl = require("../dbControl/dbControlCustomer");

router.get("/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const result = await dbControl.getCustomerByEmailAndPassword(email, password);
  if (result === -1) {
    return res.status(200).send("No customer found");
  }
  return res.send(result[0]);
});

router.post("/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  const result = await dbControl.addCustomer({ email, password });
  console.log("result: ", result);
  if (result.errno) return res.status(200).send("Email already exists");
  const customer = await dbControl.getCustomerByEmailAndPassword(
    email,
    password
  );
  res.send(customer[0]);
});

module.exports = router;
