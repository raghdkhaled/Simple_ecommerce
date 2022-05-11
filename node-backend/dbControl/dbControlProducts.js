const SQL = require("sql-template-strings");
const mysql = require("mysql2/promise");
const queries = require("./sqlStatments");
const dbControl = require("./dbControl");

async function insertProduct(product) {
  const connection = await dbControl.getConnection();
  const query = queries.insertProduct(product);

  let done = true;
  let error;
  await connection
    .query(query)
    .then((res) => {
      console.log("done with the query");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;
  return product;
}

async function getAllProducts() {
  let connection;
  let done = true,
    error,
    products;
  try {
    connection = await dbControl.getConnection();
  } catch (error) {
    return -1;
  }
  const query = queries.getAllProducts();

  await connection
    .query(query)
    .then((res) => {
      products = res[0];
      console.log("done getting all products");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;
  console.log(products);
  return products;
}

async function getProduct(id) {
  const connection = await dbControl.getConnection();
  const query = queries.getProduct(id);

  let done = true,
    error = -1,
    product;

  await connection
    .query(query)
    .then((res) => {
      product = res[0][0];

      console.log("done getting product with id " + id);
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done || !product) return error;

  product = mapToProduct(product);
  console.log(product);
  return product;
}

async function editProduct(product) {
  console.log(product);
  const connection = await dbControl.getConnection();
  const query = queries.editProduct(product);

  let done = true;
  let error;
  await connection
    .query(query)
    .then((res) => {
      console.log("done editing the product");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;

  return product;
}

async function deleteProduct(id) {
  const connection = await dbControl.getConnection();
  const query = queries.deleteProduct(id);

  let done = true;
  let error = -1;
  let result;
  await connection
    .query(query)
    .then((res) => {
      result = res;
      console.log("done deleting product");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  console.log(result[0].affectedRows);
  if (!done || result[0].affectedRows === 0) return error;

  return product;
}

function mapToProduct(textRow) {
  let product = {
    id: textRow.id,
    description: textRow.description,
    stock: textRow.stock,
    name: textRow.name,
    price: textRow.price,
    size: textRow.size,
    thumbnail: textRow.thumbnail,
    switchType: textRow.thumbnail,
    color: textRow.color,
  };
  return product;
}

module.exports.insertProduct = insertProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.editProduct = editProduct;
module.exports.deleteProduct = deleteProduct;
