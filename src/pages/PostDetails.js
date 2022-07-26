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
import { addVote, getPosts, addComment, getPost } from "../utils/api";
import { getAllPosts } from "../redux/actions/post.actions";
import CreateComment from "../component/CreateComment";
import Commentt from "../component/Commentt";
import { useContext } from "react";
import { ThemeContext } from "../component/ThemsContext";
import { getAllPostComments } from "../redux/actions/comment.actions";
import Layout from "../component/Layout";
const PostDetails = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { theme, cardTheme, buttonTheme } = useContext(ThemeContext);
  const posts = useSelector((state) => state.post);
  const comms = useSelector((state) => state.comments);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const dispatch = useDispatch();
  const vote = async (num) => {
    const Vote = { userId: user.user.id, userVote: num };
    await addVote(post.id, Vote);
    const posts = await getPosts();
    dispatch(getAllPosts(posts));
  };
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
      await addComment(post.id, comm);
      formik.resetForm();
      const posts = await getPosts();
      dispatch(getAllPosts(posts));
    },
  });
  const funToGetPost = async () => {
    const postFind = await getPost(+id);
    setPost(postFind);
    dispatch(getAllPostComments(postFind.comments));
  };

  useEffect(() => {
    funToGetPost();
  }, [posts]);

  if (!post) {
    return (
      <section className="mt-5 min-vh-100" style={theme}>
        <div className="div"></div>
        <h1>Loading...</h1>
      </section>
    );
  }

  const time = post.createdAt;
  const date=moment(post.createdAt).format("MMMM D [at] LT")

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
                <span onClick={(e) => vote(1)}>
                  <Like className="search" /> {post.upVotesTotal}
                </span>
                <span onClick={(e) => vote(-1)}>
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
                {comms.map((comment) => (
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
