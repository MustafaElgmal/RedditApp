import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { login } from "../redux/actions/user.actions";
import { useDispatch} from "react-redux";

const Login = () => {
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
      style={{ backgroundColor: "#f3f4f6" }}
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
          />
        </Form.Group>
        <Form.Text className="text-muted">
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null}
        </Form.Text>
        <Button  onClick={formik.handleSubmit} className="btn btn-danger m-2">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
