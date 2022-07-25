import React from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { addComment, getPosts } from "../utils/api";
import { useDispatch ,useSelector} from "react-redux";
import { getAllPosts } from "../redux/actions/post.actions";
import { useContext } from "react";
import { ThemeContext } from "./ThemsContext";

const CreateComment = ({ show, onHide, id }) => {
  const {theme,buttonTheme}=useContext(ThemeContext)
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user)
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .max(500, "Max is 500 characters !")
        .required("Body is required !"),
    }),
    onSubmit: async (values) => {
      const comm = { ...values, userId: user.user.id };
      await addComment(id, comm);
      onHide();
      formik.resetForm();
      const posts = await getPosts();
      dispatch(getAllPosts(posts));
    },
  });
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        formik.resetForm();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered

    >
    <div style={theme}>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Body"
              name="body"
              value={formik.values.body}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              style={theme}
            />
            <Form.Text className="text-muted">
              {formik.errors.body && formik.touched.body
                ? formik.errors.body
                : null}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={formik.handleSubmit} className={buttonTheme}>
          Add
        </Button>
      </Modal.Footer>
    </div>
      
    </Modal>
  );
};

export default CreateComment;
