import React, { useState, useEffect } from "react";
import { login } from "./../../services/mainHttpService";
import { useData } from "./../../contexts/commonData";
import { useHistory } from "react-router-dom";
import logo from "./../../assets/coloredLogo.svg";
import logoA from "./../../assets/logoA.svg";
import tag from "./../../assets/tag.svg";

function Login() {
  const { setUser, animations, setAnimations } = useData();
  const history = useHistory();

  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (details.email === "") {
      setEmailError("Email Is Required");
      setPasswordError("");
      setError("");
    } else if (!validateEmail(details.email)) {
      setEmailError("Invalid Email");
      setPasswordError("");
      setError("");
    } else if (details.password === "") {
      setPasswordError("Password Is Required");
    } else {
      setEmailError("");
      setPasswordError("");
      //call api

      setIsLoading(true);
      const { data } = await login(details.email, details.password);
      console.log("data", data);
      if (data === "No customer found") {
        setError("Invalid Email Or Password");
        setIsLoading(false);
        return;
      }

      setError("");
      setUser(data);
      setIsLoading(false);
      history.replace("/home");
    }
  };

  useEffect(() => {
    //remove animation
    setTimeout(() => {
      setAnimations([]);
    }, 4000);
  }, []);

  return (
    <form
      onSubmit={submitHandler}
      className="col-12 d-flex flex-column  align-items-center my-5  flex-grow-1"
    >
      <div className="form-inner col-12  d-flex flex-column flex-grow-1 pt-5 mt-5 align-items-center ">
        <div className={`logo-container ${animations[0]}`}>
          <img draggable="false" src={tag} class={`tag ${animations[2]}`} />
          <img draggable="false" src={logoA} class={`logo ${animations[3]}`} />
        </div>

        <div
          className={`${animations[1]} d-flex col-12 justify-content-center flex-column align-items-center`}
        >
          <div
            className="form-group d-flex flex-column col-3 "
            style={{ marginTop: "200px" }}
          >
            <label className="text-secondary mb-1" htmlFor="E-Mail">
              Email
            </label>
            <input
              type="e-mail"
              name="e-mail"
              id="e-mail"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
          <div className="form-group d-flex flex-column col-3 mt-4">
            <label className="text-secondary mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          {error != "" ? (
            <div className="alert alert-danger px-1 py-1 mt-2 col-3">
              {error}
            </div>
          ) : (
            <></>
          )}
          <button
            className="btn btn-primary py-1 px-4 fw-bold mt-5 "
            type="submit"
          >
            Login
          </button>
          <span className="mt-3">
            Don't have an account?{" "}
            <label
              className="text-primary fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/register");
              }}
            >
              Sign Up
            </label>
          </span>
        </div>
      </div>
    </form>
  );
}
export default Login;
