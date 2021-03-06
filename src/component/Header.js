import React, { useEffect, useState } from "react";
import { Navbar, Container, Image, Button } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/Reddit-Logo.wine.svg";
import CreatePost from "./CreatePost";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/actions/post.actions";
import { getPosts } from "../utils/api";
import { logout } from "../redux/actions/user.actions";
import { useContext } from "react";
import { ThemeContext } from "./ThemsContext";
import {getAllPostComments} from '../redux/actions/comment.actions'

const Header = () => {
  const user = useSelector((state) => state.user);
  const [bool,setBool]=useState(false)
  const displayToggle=()=>{
   setBool(!bool)
  }
  const location = useLocation();
  const { theme, buttonTheme, navTheme, themeToggle, currentTheme } =
    useContext(ThemeContext);

  const dispatch = useDispatch();
  const searchFilter = async (value='') => {
    const posts = await getPosts();
    if (location.pathname === "/") {
      let Filter = posts.filter((post) =>
        post.title.toLowerCase().includes(value)
      );
      dispatch(getAllPosts(Filter));
    } else {
      const id = location.pathname.split("/")[2];
      const postfind = posts.find((post) => post.id === +id);
      const Filter=postfind.comments.filter((comm)=>comm.body.toLowerCase().includes(value))
      dispatch(getAllPostComments(Filter))
    }
  };

  useEffect(()=>{
    searchFilter()

  })
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Navbar
      className="fixed-top navbar-expand-lg mo"
      style={{ ...navTheme, height: "4.5rem" }}
    >
      <Container className="d-flex justify-content-between">
        <div>
          <Link to="/">
            <Logo className="logo" />
          </Link>
        </div>

        {user.isLoggedIn? (
          <div className="main">
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                name="searchFilter"
                onChange={(e) => {
                  searchFilter(e.target.value);
                  e.preventDefault();
                }}
                style={theme}
              />
            </div>
          </div>
        ) : null}

        {user.isLoggedIn ? (
          <div className="d-flex position-relative">
            <div onClick={displayToggle}>
              <Image
                src="https://review2020.s3.amazonaws.com/57cd4468-6c75-4aa4-a374-d32847c43637.jpg"
                alt="..."
                roundedCircle
                className="img"
                
              />
            </div>
            <div className={bool?"media show":"media notshow"}>
              <Button
                className={buttonTheme}
                onClick={() => setModalShow(true)}
              >
                New Post
              </Button>
              <Link
                to="/"
                className={`${buttonTheme} bt`}
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("user");
                }}
              >
                Logout
              </Link>
              <Button
                className={`${buttonTheme} bt`}
                onClick={themeToggle}
              >{`${currentTheme === "light" ? "Dark" : "Light"}`}</Button>
            </div>
          </div>
        ) : (
          <Button className={`${buttonTheme} ms-2`} onClick={themeToggle}>{`${
            currentTheme === "light" ? "Dark" : "Light"
          }`}</Button>
        )}

        <CreatePost show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </Navbar>
  );
};

export default Header;
