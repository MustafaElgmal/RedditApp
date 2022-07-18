import React from "react";
import { Navbar,Container,Image,Button } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/Reddit-Logo.wine.svg";
import CreatePost from "./CreatePost";
import { Link,useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getAllPosts } from "../redux/actions/post.actions";
import { getPosts } from "../utils/api";
import { logout } from "../redux/actions/user.actions";
import { useContext } from "react";
import { ThemeContext } from "./ThemsContext";

const Header = () => {
const user=useSelector(state=>state.user)
const location=useLocation()
const {theme,buttonTheme,navTheme ,themeToggle,currentTheme} =useContext(ThemeContext) 

const dispatch=useDispatch()
  const searchFilter=async(value)=>{
    const posts=await getPosts()
    if(location.pathname==='/'){
      let Filter=posts.filter((post)=>post.title.toLowerCase().includes(value))
      dispatch(getAllPosts(Filter))
    }else{
      const id=location.pathname.split("/")[2]
      const postfind=posts.find((post)=>post.id===+id)
    }
  }
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Navbar
      className="fixed-top navbar-expand-lg"
      style={{...navTheme, height: "4.5rem" }}
    >
      <Container className="d-flex justify-content-between">
        <div>
          <Link to="/">
            <Logo className="logo" />
          </Link>
        </div>

        {user.isLoggedIn ||JSON.parse(localStorage.getItem('isLoggedIn'))?<div className="main">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="searchFilter"
            onChange={(e) => {
              searchFilter(e.target.value)
              e.preventDefault()
            
            }}
            style={theme}
          />
        </div>
      </div>:null}

        
{user.isLoggedIn ||JSON.parse(localStorage.getItem('isLoggedIn'))? <div>
  <Image
    src="https://review2020.s3.amazonaws.com/57cd4468-6c75-4aa4-a374-d32847c43637.jpg"
    alt="..."
    roundedCircle
    className="img"
  />
  <Button className={buttonTheme} onClick={() => setModalShow(true)}>
    New Post
  </Button>
  <Button className={`${buttonTheme} ms-2`} onClick={() =>{dispatch(logout())
    localStorage.removeItem('isLoggedIn')
  }}>
    Logout
  </Button>
  <Button className={`${buttonTheme} ms-2`} onClick={themeToggle}>{`${currentTheme==='light'?"Dark":"Light"}`}</Button>
</div>:null}
       

        <CreatePost show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </Navbar>
  );
};

export default Header;
