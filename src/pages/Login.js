import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Image } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "../component/ThemsContext";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

const Login = () => {
  const { theme, buttonTheme, cardTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please Enter your Email"),
      password: Yup.string().required("Please Enter your password"),
    }),
    onSubmit: async (values) => {
       await loginUser(values,dispatch,navigate);
      formik.resetForm();
    },
  });
  return (
   
    <section className="mt-5 min-vh-100" style={{ ...theme }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black mt-4"
              style={{ ...cardTheme, borderRadius: "25px" }}
            >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            name="email"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Email"
                          />
                          <p className="text-danger">
                            {formik.errors.email && formik.touched.email
                              ? formik.errors.email
                              : null}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            name="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Password"
                          />
                          <p className="text-danger">
                            {formik.errors.password && formik.touched.password
                              ? formik.errors.password
                              : null}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className={buttonTheme}
                          onClick={formik.handleSubmit}
                        >
                          Login
                        </button>
                        <Link to="/signUp" className="mt-2 ms-2 text-black">
                          Don't Have an Account?
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <Image
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
