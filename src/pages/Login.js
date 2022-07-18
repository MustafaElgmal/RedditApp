import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { login } from "../redux/actions/user.actions";
import { useDispatch} from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "../component/ThemsContext";
import { Link } from "react-router-dom";

const Login = () => {
  const {theme,buttonTheme}=useContext(ThemeContext)
    const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please Enter your Email"),
      password: Yup.string()
        .required("Please Enter your password")
    }),
    onSubmit: (values) => {
        dispatch(login(values.email))
        localStorage.setItem("isLoggedIn",true)
        formik.resetForm()
    },
  });
  return (
    <div
      className="d-flex justify-content-center min-vh-100"
      style={theme}
    >
      <Form style={{ width: "20rem", marginTop: "15rem" }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            style={theme}
          />
          <Form.Text className="text-muted">
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : null}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            style={theme}
          />
        </Form.Group>
        <Form.Text className="text-muted">
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null}
        </Form.Text>
        <Link to="/" className={`${buttonTheme} m-2 ms-0`} onClick={formik.handleSubmit}>
        Login
        </Link>
      </Form>
    </div>
  );
};

export default Login;
