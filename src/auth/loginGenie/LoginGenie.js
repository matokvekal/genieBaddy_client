import { useEffect } from "react";
import "./LoginGenie.css";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import useDataStore from "../../stores/appStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USERS_ROLES, PATHS_NAMES } from "constants";

function LoginGenie() {
  const navigate = useNavigate();
  const { handleLogin, mode, loginStatus } = useStore(useDataStore);

  useEffect(() => {
    if (
      loginStatus === true ||
      localStorage.getItem("authenticated") === "true"
    ) {
      navigate(PATHS_NAMES.GENIE);
    }
  }, [loginStatus, navigate]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Must contain at least 8 characters, one uppercase letter, and one number"
        )
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const res = await handleLogin(
        values,
        (values.userRole = "genie")
        // (values.userRole = USERS_ROLES.GENIE)
      );
      if (res.status !== 200) {
        formik.setStatus({ errorMsg: "Invalid username or password" });
      } else {
        navigate(PATHS_NAMES.GENIE);
      }
    },
  });

  return (
    <div className="Logingenie  d-flex row justify-content-center">
      <div className="col-lg-6 order-sm-0 order-lg-1 my-lg-5">
        <div className="cherry-img">
          <img
            src={require(`assets/PNG/cherry2.png`)}
            className="cherry"
            alt="send"
            width={30}
          />
        </div>
        <h2 className="Logingenie__title">Share for Genie</h2>
        <form
          className="Logingenie__form mt-5 col-lg-8 px-0"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          {formik.status?.errorMsg && (
            <div className="alert alert-danger">{formik.status.errorMsg}</div>
          )}
          <div className="form-group my-3">
            <label htmlFor="username">Username</label>
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
            <button
              type="submit"
              className="mt-3 Logingenie__submit-btn1 genie"
            >
              Login
            </button>
          </div>
          {/* {mode === "development" && <h2>MODE:DEVELOPMENT</h2>} */}
          <hr className="mt-4" />
          <div className="text-center">
            <span>
              Don't have an account?
              {/* <Link
                to={PATHS_NAMES.REGISTERGENIE}
                className="Logingenie__register-link"
              >
                Register
              </Link> */}
            </span>
            {/* <span>
              Are you User?
              <Link to={PATHS_NAMES.LOGINUSER} className="Logingenie__register-link">
                User Login
              </Link>
            </span> */}
          </div>
        </form>
      </div>
      <div className="col-lg-6 order-sm-1 order-lg-0 my-4 my-lg-0 text-end"></div>
    </div>
  );
}

export default LoginGenie;
