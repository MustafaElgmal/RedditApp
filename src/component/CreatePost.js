import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { addPost, getAlltags, getPosts } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "./ThemsContext";

const CreatePost = ({ show, onHide }) => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const [tags, setTags] = useState([]);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      tags: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Max value is 100 characters !")
        .required("Title is required !"),
      body: Yup.string()
        .max(500, "Max is 500 characters !")
        .required("Body is required !"),
      tags: Yup.array().min(1).required("Tag is required!"),
    }),
    onSubmit: async (values) => {
    
        const post = { ...values,tagIds:values.tags};
        await addPost(post, user.token);
        await getPosts(dispatch, user.token);
      formik.resetForm();
      onHide();
    },
  });

  const updateTags = async () => {
      await getAlltags(user.token, setTags)
  };

  useEffect(() => {
    updateTags();
  }, []);
  return (
    <Modal
      show={show}
      onHide={() => {
        formik.resetForm();
        onHide();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={theme}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                style={theme}
              />
              <Form.Text className="text-danger">
                {formik.errors.title && formik.touched.title
                  ? formik.errors.title
                  : null}
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
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
              <Form.Text className="text-danger">
                {formik.errors.body && formik.touched.body
                  ? formik.errors.body
                  : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags:</Form.Label>
              <Form.Select
                name="tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiple={true}
              >
                {tags.map((tag) => (
                  <option value={tag.id} key={tag.id}>
                    {tag.title}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-danger">
                {formik.errors.tags && formik.touched.tags
                  ? formik.errors.tags
                  : null}
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={formik.handleSubmit} className={buttonTheme}>
            Post
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CreatePost;
