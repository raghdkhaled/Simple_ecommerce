import { useEffect, useState } from "react";
import { getProductImages } from "../../../services/products";
import notFound from "../../../assets/notFound.png";
import { useSessionStorage } from "../../common/Hooks/useStorage";
import { useHistory } from "react-router-dom";
import razer from "../../../assets/razer.jpg";

const Product = ({ product }) => {
  const [images, setImages] = useSessionStorage(product.id, []);
  const history = useHistory();

  useEffect(() => {
    async function fetchImages(id) {
      const { data } = await getProductImages(id);
      setImages(data);
    }
    fetchImages(product.id);
  }, []);

  return (
    <div
      className="col my-4 mx-2 d-flex flex-column justify-content-center align-items-center text-center rounded bg-white p-3 shadow"
      //   style={{
      //     maxWidth: "235px",
      //   }}
    >
      <img
        className="img rounded "
        style={{
          width: "250px",
          height: "300px",
          objectFit: "scale-down",
        }}
        src={
          product.name === "name"
            ? razer
            : images?.length
            ? images[0]
            : notFound
        }
        onClick={() => {
          history.push(`/products/${product.id}`);
        }}
      />
      <div className="mt-2  align-items-center">
        <label className="text-secondary fs-5 fw-bold col">
          {product.name}
        </label>
        <br />
        <label className="text-success fs-5 fw-bold col">
          {product.price.toFixed(2)}EGP{" "}
        </label>
      </div>
    </div>
  );
};

export default Product;
