import React, { useState } from "react";
import { Navbar, Container, Image, Button } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/Reddit-Logo.wine.svg";
import CreatePost from "./CreatePost";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/user.actions";
import { useContext } from "react";
import { ThemeContext } from "./ThemsContext";
import { searchFilter } from "../utils/functions";

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const [bool, setBool] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, buttonTheme, navTheme, themeToggle, currentTheme } =
    useContext(ThemeContext);
  const displayToggle = () => {
    setBool(!bool);
  };
  return (
    <Navbar
      className="fixed-top navbar-expand-lg mo"
      style={{ ...navTheme, height: "60px" }}
    >
      <Container className="d-flex justify-content-between">
        <div>
          <Link to="/">
            <Logo className="logo" />
          </Link>
        </div>

        {user.isLoggedIn ? (
          <div className="main">
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                name="searchFilter"
                onChange={(e) => {
                  searchFilter(
                    e.target.value,
                    location,
                    dispatch,
                    posts,
                    comments
                  );
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
                src={`${
                  user.imgageUrl
                    ? user.imgageUrl
                    : "https://dzgcboayiitowsqexckt.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjYzNjczNiwiZXhwIjoxOTgxOTk2NzM2fQ.uMhGnnaeH-d74B6orNInFqtTqRxfEQr8bddHeyaJyBo"
                }`}
                alt="..."
                roundedCircle
                className="img"
              />
            </div>
            <div className={bool ? "media show" : "media notshow"}>
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
              <Button className={`${buttonTheme} bt`} onClick={themeToggle}>{`${
                currentTheme === "light" ? "Dark" : "Light"
              }`}</Button>
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
