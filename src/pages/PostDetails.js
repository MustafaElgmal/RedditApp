import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Button, Image, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReactComponent as Like } from "../assets/like-svgrepo-com.svg";
import { ReactComponent as Dislike } from "../assets/dislike-svgrepo-com.svg";
import { ReactComponent as Comment } from "../assets/comment-bubble-with-three-squares-svgrepo-com.svg";
import { getPosts, addComment, getPost } from "../utils/api";
import CreateComment from "../component/CreateComment";
import Commentt from "../component/Commentt";
import { useContext } from "react";
import { ThemeContext } from "../component/ThemsContext";
import { vote } from "../utils/functions";

const PostDetails = () => {
  const [modalShow, setModalShow] = useState(false);
  const [post, setPost] = useState({});
  const { theme, cardTheme, buttonTheme } = useContext(ThemeContext);
  const user = useSelector((state) => state.user);
  const comments=useSelector((state)=>state.commentsFilter)
  const posts=useSelector((state)=>state.posts)
  const { id } = useParams();

  const dispatch = useDispatch();

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
      const comm = { ...values };
      await addComment(post.id, comm, user.token);
      formik.resetForm();
      await getPosts(dispatch, user.token);
    },
  });
  const updatePost = async () => {
    await getPost(+id, user.token, setPost,dispatch);
  };

  useEffect(() => {
    updatePost();
  }, [posts]);

  if (!post) {
    return (
      <section className="mt-5 min-vh-100" style={theme}>
        <div className="div"></div>
        <h1>Loading...</h1>
      </section>
    );
  }

  const date = moment(post.createdAt).format("MMMM D [at] LT");

  return (
    <section className="mt-5 min-vh-100" style={theme}>
      <Container>
        <div className="div"></div>
        <Card style={{ ...cardTheme }} className="postDe ">
          <div className="d-flex justify-content-start gap-3 ms-4 mt-4 ">
            <Image
              src="https://review2020.s3.amazonaws.com/2f919e51-bf02-4f0d-a408-1607e79f2ec4.jpg"
              alt="Nocontent"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div>
              <h4>{post.title}</h4>
              <p className="text-muted">{date}</p>
            </div>
          </div>
          <hr />

          <Card.Body className="ms-3 mb-3">
            <Card.Text>{post.body}</Card.Text>
            <div className="d-flex justify-content-between">
              <div>
                <span onClick={(e) => vote(1, post.id, dispatch)}>
                  <Like className="search" /> {post.upVotesTotal}
                </span>
                <span onClick={(e) => vote(1, post.id, dispatch)}>
                  <Dislike className="search" /> {post.downVotesTotal}
                </span>
                <span
                  onClick={(e) => {
                    setModalShow(true);
                  }}
                >
                  <Comment className="search" /> {post.commentsTotal}
                </span>
              </div>
            </div>
            <CreateComment
              id={post.id}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Card.Body>
        </Card>
        <Card style={{ ...cardTheme }} className="mt-3 postDe">
          <div className="d-flex justify-content-start ms-3 mt-3">
            <Card.Title>Comments</Card.Title>
          </div>
          <hr />
          <Card.Body>
            <div>
              <div>
                {comments.map((comment) => (
                  <Commentt key={comment.id} comment={comment} />
                ))}
              </div>

              <Form className="mt-5">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    style={{ ...theme, height: "4rem" }}
                    as="textarea"
                    placeholder="Add comment"
                    name="body"
                    value={formik.values.body}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Form.Text className="text-muted">
                    {formik.errors.body && formik.touched.body
                      ? formik.errors.body
                      : null}
                  </Form.Text>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <div></div>
                  <Button onClick={formik.handleSubmit} className={buttonTheme}>
                    Comment
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default PostDetails;
