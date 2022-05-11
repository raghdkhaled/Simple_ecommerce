const queries = require("./sqlStatments");
const dbControl = require("./dbControl");

async function getCustomerCart(customer_id) {
  const connection = await dbControl.getConnection();
  const query = queries.getCustomerCart(customer_id);

  let done = true,
    error = -1,
    items;

  await connection
    .query(query)
    .then((res) => {
      items = res[0];
      console.log("done getting all items in cart");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;
  console.log(items);
  return items;
}

async function addToCart(customer_id, item) {
  const connection = await dbControl.getConnection();
  const query = queries.addItemToCart(customer_id, item);

  let done = true,
    error = -1;

  await connection
    .query(query)
    .then((res) => {
      console.log("done adding item to cart");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;
  console.log(item);
  return item;
}

async function editItemQuantityInCart(customer_id, item) {
  const connection = await dbControl.getConnection();
  const query = queries.editItemQuantityInCart(customer_id, item);

  let done = true,
    error = -1,
    result;

  await connection
    .query(query)
    .then((res) => {
      result = res[0];
      console.log("done editing item");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;
  return result.affectedRows >= 1 ? 1 : 0;
}
async function resetCart(customer_id) {
  const connection = await dbControl.getConnection();
  const query = queries.resetCart(customer_id);

  let done = true,
    error = -1,
    result;

  await connection
    .query(query)
    .then((res) => {
      result = res[0];
      console.log("done reseting cart");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;
  return result.affectedRows >= 1 ? 1 : 0;
}

async function deleteItemInCart(customer_id,itemSku) {
  const connection = await dbControl.getConnection();
  const query = queries.deleteItemInCart(customer_id,itemSku);

  let done = true,
    error = -1,
    result;

  await connection
    .query(query)
    .then((res) => {
      result = res[0];
      console.log("done deleting item from cart");
    })
    .catch((err) => {
      error = err.sqlMessage;
      done = false;
    });
  connection.end();
  if (!done) return error;
  return result.affectedRows >= 1 ? 1 : 0;
}
module.exports.getCustomerCart = getCustomerCart;
module.exports.addToCart = addToCart;
module.exports.editItemQuantityInCart = editItemQuantityInCart;
module.exports.resetCart = resetCart;
module.exports.deleteItemInCart = deleteItemInCart;
