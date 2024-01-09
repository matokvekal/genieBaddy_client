import { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import useDataStore from "../../stores/appStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USERS_ROLES, PATHS_NAMES } from "constants";

function LoginUser() {
  const navigate = useNavigate();
  const {
    handleLogin,
    loginStatus,
    handleConfirmOtp,
    handleregister,
    updateUserName,
    getUserName,
  } = useStore(useDataStore);
  // const [page, setPage] = useState("login");register  register
  const [page, setPage] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchLogin = (newPage) => {
    // Reset form state for a clean switch
    formik.resetForm({
      values: {
        username: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
        confirmationCode: "", // Reset based on which page you are switching to
      },
    });
    setPage(newPage);
  };
  //focus at password input
  // useEffect(() => {
  //   if (page === "login" && getUserName()) {
  //     passwordInputRef.current?.focus();
  //   }
  // }, [page, getUserName]);

  useEffect(() => {
    if (
      loginStatus === true ||
      localStorage.getItem("authenticated") === "true"
    ) {
      navigate(PATHS_NAMES.USER);
    }
  }, [loginStatus, navigate]);
  const loginValidationSchema = Yup.object({
    username: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must contain at least 8 characters, one uppercase letter, and one number"
      )
      .required("Required"),
  });

  const registerValidationSchema = Yup.object({
    username: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must contain at least 8 characters, one uppercase letter, and one number"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    termsAccepted: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  });
  const confirmValidationSchema = Yup.object({
    confirmationCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Must be exactly 6 digits")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      confirmationCode: "", // Initial value for terms checkbox
    },
    validationSchema: (() => {
      switch (page) {
        case "login":
          return loginValidationSchema;
        case "register":
          return registerValidationSchema;
        case "confirm":
          return confirmValidationSchema;
        default:
          return Yup.object(); // default to a basic schema if page state is unrecognized
      }
    })(),

    onSubmit: async (values) => {
      if (page === "login") {
        const res = await handleLogin(
          values,
          (values.userRole = USERS_ROLES.USER)
        );
        if (res.status !== 200) {
          formik.setStatus({ errorMsg: "Invalid username or password" });
        } else {
          navigate(PATHS_NAMES.USER);
        }
      } else if (page === "register") {
        setIsLoading(true);
        values.userRole = USERS_ROLES.USER;
        const res = await handleregister(values);
        setIsLoading(false);
        formik.setFieldValue("password", "");
        formik.setFieldValue("confirmPassword", "");
        if (res?.response?.data?.message === "sentOtpByMail") {
          updateUserName(values.username);
          setPage("confirm");
        } else {
          formik.setStatus({ errorMsg: res?.response?.data?.message });
        }
      } else if (page === "confirm") {
        const email = getUserName();
        if (email && values.confirmationCode) {
          const res = await handleConfirmOtp(values.confirmationCode, email);
          if (res?.response?.data?.message === "success") {
            handleSwitchLogin("login");
          } else {
            formik.setStatus({ errorMsg: res?.response?.data?.message });
          }
        }
      }
    },
  });
  return (
    <div className="Login d-flex row justify-content-center">
      <div className="col-lg-6 order-sm-0 order-lg-1 my-lg-5">
        <h2 className="Login__title">
          {page === "login"
            ? "Login user."
            : page === "register"
            ? "Register user."
            : "Confirm Code"}
        </h2>
        {page === "login" && (
          <form
            className="Login__form mt-5 col-lg-8 px-0"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            {formik.status?.errorMsg && (
              <div className="alert alert-danger">{formik.status.errorMsg}</div>
            )}
            <div className="form-group my-3">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-danger">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="form-group my-2 text-right">
              <button type="submit" className="mt-3 Login__submit-btn">
                Login
              </button>
            </div>
            {/* {mode === "development" && <h2>MODE:DEVELOPMENT</h2>} */}
            <hr className="mt-4" />
            <div className="text-center">
              <span onClick={() => handleSwitchLogin("register")}>
                Don't have an account? Register
              </span>
            </div>
          </form>
        )}
        {page === "register" && (
          <form
            className="Login__form mt-5 col-lg-8 px-0"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            {formik.status?.errorMsg && (
              <div className="alert alert-danger">{formik.status.errorMsg}</div>
            )}
            <div className="form-group my-3">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={(e) => {
                  formik.setStatus({ errorMsg: "" });
                  // formik.setFieldError("username", "");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-danger">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.setStatus({ errorMsg: "" });
                  // formik.setFieldError("username", "");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="form-group my-3">
              <label htmlFor="confirmPassword">Repeat Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={(e) => {
                  formik.setStatus({ errorMsg: "" });
                  // formik.setFieldError("username", "");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-danger">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="form-group my-3">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formik.values.termsAccepted}
                onChange={formik.handleChange}
              />
              <label htmlFor="termsAccepted" className="ml-1">
                I agree to the <Link to="/terms">Terms and Conditions</Link>
              </label>
              {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
                <div className="text-danger">{formik.errors.termsAccepted}</div>
              ) : null}
            </div>
            <div className="form-group my-2 text-right">
              <button
                type="submit"
                className="mt-3 Login__submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
            <hr className="mt-4" />
            <div className="text-center">
              <span onClick={() => handleSwitchLogin("login")}>
                Allredy have an account? Login
              </span>
            </div>
          </form>
        )}
        {page === "confirm" && (
          <form
            className="Login__form mt-5 col-lg-8 px-0"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            {formik.status?.errorMsg && (
              <div className="alert alert-danger">{formik.status.errorMsg}</div>
            )}

            <p>Enter the 6-digit confirmation code sent to your email:</p>

            <div className="form-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Confirmation Code"
                name="confirmationCode"
                value={formik.values.confirmationCode}
                onChange={formik.handleChange}
                maxLength={6}
              />
              {formik.touched.confirmationCode &&
                formik.errors.confirmationCode && (
                  <div className="text-danger">
                    {formik.errors.confirmationCode}
                  </div>
                )}
            </div>
            <div className="form-group my-2 text-right">
              <button type="submit" className="mt-3 Login__submit-btn">
                SEND
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="col-lg-6 order-sm-1 order-lg-0 my-4 my-lg-0 text-end"></div>
    </div>
  );
}

export default LoginUser;
