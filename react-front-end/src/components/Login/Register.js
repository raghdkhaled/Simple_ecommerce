import React, { useState } from "react";
import { signup } from "../../services/mainHttpService";
import { useData } from "../../contexts/commonData";
import { useHistory } from "react-router-dom";
import logo from "./../../assets/coloredLogo.svg";
import logoA from "./../../assets/logoA.svg";
import tag from "./../../assets/tag.svg";
function Register() {
  const { setUser } = useData();
  const history = useHistory();

  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const validateEmail = (email) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  const submitHandler = async (e) => {
    e.preventDefault();
    if (details.email === "") {
      setError("Email Is Required");
    } else if (!validateEmail(details.email)) {
      setError("InvalidEmail");
    } else if (details.password === "") {
      setError("Password Is Required");
    } else if (details.password !== details.confirmPassword) {
      setError("Passwords Do Not Match");
    } else {
      setError("");
      //call api

      setIsLoading(true);
      const { data } = await signup(details.email, details.password);
      if (data === "Email already exists") {
        setError("Email already exists");
        setIsLoading(false);
        return;
      }

      setError("");
      setUser(data);
      setIsLoading(false);
      history.replace("/home");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="col-12 d-flex flex-column  align-items-center my-5  flex-grow-1"
    >
      <div className="form-inner col-12  d-flex flex-column flex-grow-1 pt-5  align-items-center " style={{marginTop:"48px"}}>
        <div className={`logo-container`} >
          <img draggable="false" src={tag} class={`tag `} />
          <img draggable="false" src={logoA} class={`logo `} />
        </div>

        <div
          className="form-group d-flex flex-column col-3 "
          style={{ marginTop: "90px" }}
        >
          <label className="text-secondary mb-1" htmlFor="E-Mail">
            Email
          </label>
          <input
            type="e-mail"
            name="e-mail"
            id="e-mail"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
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
        <div className="form-group d-flex flex-column col-3 mt-4">
          <label className="text-secondary mb-1" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, confirmPassword: e.target.value })
            }
            value={details.confirmPassword}
          />
        </div>
        {error != "" ? (
          <div className="alert alert-danger px-1 py-1 mt-2 col-3">{error}</div>
        ) : (
          <></>
        )}
        <button
          className="btn btn-primary py-1 px-4 fw-bold mt-5"
          type="submit"
        >
          Sign up
        </button>
        <span className="mt-3">
          Have an account?{" "}
          <label
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/login");
            }}
          >
            login
          </label>
        </span>
      </div>
    </form>
  );
}
export default Register;
