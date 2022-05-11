const customer = require("./routes/customers");

const cart = require("./routes/cart");
const login = require("./routes/login");
const products = require("./routes/products");
const product_images = require("./routes/product_images");
const express = require("express");
const cors = require("cors");
const formData = require("express-form-data");
const port = process.env.PORT || 3900;
const app = express();
const auth = require("./middleware/auth");

app.use("/images", express.static("public"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(formData.parse());
app.use(auth.verifyToken);

app.use("/api/login", login);
app.use("/api/customers", customer);
app.use("/api/cart", cart);
app.use("/api/products", products);
app.use("/api/products_images", product_images);
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*

local database
{
  "name": "default config",
  "requiresAuth": false,
  "database": {
    "host": "127.0.0.1",
    "user": "root",
    "port": "3306",
    "database": "web_project",
    "password": "01003494703Mn"
  }
}



*/
