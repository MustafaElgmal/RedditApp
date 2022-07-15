import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/Reddit-Logo.wine.svg";
import Button from "react-bootstrap/Button";
import CreatePost from "./CreatePost";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions";
import { getPosts } from "../utils/api";

const Header = () => {

  const dispatch=useDispatch()
  const searchFilter=async(value)=>{
    const posts=await getPosts()
    let Filter=posts.filter((post)=>post.title.toLowerCase().includes(value))
    dispatch(getAllPosts(Filter))
  }
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Navbar
      bg="white"
      className="fixed-top navbar-expand-lg"
      style={{ height: "4.5rem" }}
    >
      <Container className="d-flex justify-content-between">
        <div>
          <Link to="/">
            <Logo className="logo" />
          </Link>
        </div>

        <div className="main">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              name="searchFilter"
              onChange={(e) => searchFilter(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Image
            src="https://review2020.s3.amazonaws.com/57cd4468-6c75-4aa4-a374-d32847c43637.jpg"
            alt="..."
            roundedCircle
            className="img"
          />
          <Button className="btn btn-danger" onClick={() => setModalShow(true)}>
            New Post
          </Button>
        </div>

        <CreatePost show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </Navbar>
  );
};

export default Header;
