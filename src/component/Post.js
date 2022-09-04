import React from "react";
import Container from "react-bootstrap/Container";
import moment from "moment";
import Image from "react-bootstrap/Image";
import { ReactComponent as Like } from "../assets/like-svgrepo-com.svg";
import { ReactComponent as Dislike } from "../assets/dislike-svgrepo-com.svg";
import { ReactComponent as Comment } from "../assets/comment-bubble-with-three-squares-svgrepo-com.svg";
import { ReactComponent as Arrow } from "../assets/right-arrow-next-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import CreateComment from "./CreateComment";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "./ThemsContext";
import { vote } from "../utils/functions";
const Post = ({ post }) => {
  const user=useSelector((state)=>state.user)
  const { cardTheme } = useContext(ThemeContext);

  const date = moment(post.createdAt).format("MMMM D [at] LT");
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container>
      <Card style={{ ...cardTheme }} className="ms-4 mt-3 posts">
        <div className="d-flex justify-content-start gap-3 ms-4 mt-4 ">
          <Image
            src="https://review2020.s3.amazonaws.com/2f919e51-bf02-4f0d-a408-1607e79f2ec4.jpg"
            alt="Nocontent"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <div>
            <h4>{`${post.user.firstName} ${post.user.lastName}`}</h4>
            <p className="text-muted">{date}</p>
          </div>
        </div>

        <Card.Body className="ms-3 mb-3">
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <div className="d-flex justify-content-between">
            <div>
              <span onClick={(e) => vote(1, post.id, dispatch,user.token)}>
                <Like className="search" /> {post.upVotesTotal}
              </span>
              <span onClick={(e) => vote(-1, post.id, dispatch,user.token)}>
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
            <div>
              <Link to={`/postDetails/${post.id}`} style={{ color: "black" }}>
                {" "}
                Open post
                <Arrow className="search" />
              </Link>
            </div>
          </div>

          <CreateComment
            id={post.id}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Post;
