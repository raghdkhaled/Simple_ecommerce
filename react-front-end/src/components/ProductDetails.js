import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProduct, getProductImages } from "../services/products";
import notFound from "../assets/notFound.png";
import Loading from "./common/Loading/Loading";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useData } from "./../contexts/commonData";
import { toast } from "react-toastify";
import audio from "./../assets/ding.mp3";
import razer from "../assets/razer.mp4";

const ProductDetails = (props) => {
  const id = props.match.params.id;
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const addToCartAudio = new Audio(audio);

  const { setUserCart, userCart } = useData();
  const videoRef = React.createRef();

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getProduct(id);
      const { data: images } = await getProductImages(id);

      setProduct(data);
      setProductImages(images);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    setQuantity((quantity) => (quantity + value > 0 ? quantity + value : 1));
  };

  const handleAddToCart = () => {
    //check if product is already in cart
    addToCartAudio.volume = 0.2;
    addToCartAudio.play();
    const productInCart = userCart.find((item) => item.id === product.id);

    if (productInCart) {
      // if product is already in cart, update quantity
      const newCart = userCart.map((item) => {
        if (item.id === product.id) {
          item.quantity = item.quantity + quantity;
        }
        return item;
      });
      setUserCart(newCart);
      toast.success(`Item added to cart`);
    } else {
      // if product is not in cart, add it
      setUserCart([
        ...userCart,
        { ...product, quantity, image: productImages[0] },
      ]);
      toast.success(`Item added to cart`);
    }
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="d-flex flex-column flex-grow-1 mt-5 align-items-center ">
      <div className="bg-white col-10 p-5 rounded shadow">
        <div className="d-flex flex-row ">
          <div
            style={{
              width: "400px",
            }}
          >
            {product.id == 1 ? (
              <>
                <video
                  src={razer}
                  type="video/mp4"
                  ref={videoRef}
                  style={{
                    width: "400px",
                    height: "400px",
                    objectFit: "scale-down",
                  }}
                  onClick={togglePlay}
                  onDoubleClick={toggleFullScreen}
                />
                Video
              </>
            ) : (
              <img
                src={productImages[0]}
                className="w-100"
                style={{
                  height: "400px",
                  objectFit: "scale-down",
                }}
              />
            )}
          </div>

          <div className="d-flex flex-column justify-content-between col ms-5">
            <div className="d-flex flex-column">
              <label className="text-secondary fs-1 fw-bold text-capitalize">
                {product?.name}
              </label>
              <label className="text-secondary fs-3 text-capitalize">
                {product?.description}
              </label>
            </div>
            <div className="d-flex justify-content-between col-12 ms-2">
              <div className="d-flex text-center align-items-center">
                <label className="text-secondary fs-3 fw-bold">Quantity:</label>

                <i
                  className="fs-3 fa fa-minus-circle text-primary mx-2"
                  onClick={() => {
                    handleQuantityChange(-1);
                  }}
                />
                <label className="text-secondary fs-3 fw-bold">
                  {quantity}
                </label>
                <i
                  className="fs-3 fa fa-plus-circle text-primary mx-2"
                  onClick={() => {
                    handleQuantityChange(1);
                  }}
                />
              </div>
              <div className="d-flex">
                <label className="text-success fs-3 fw-bold">
                  {+(product?.price * quantity).toFixed(2)}
                </label>
                <label className="text-secondary fs-3 fw-bold">EGP</label>
              </div>

              <button
                className="btn btn-success fs-4 fw-bold py-1 px-3"
                onClick={handleAddToCart}
              >
                <i className="fa fa-cart-plus me-2" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
