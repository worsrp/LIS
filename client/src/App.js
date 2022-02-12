import React,{useState, useEffect, useContext } from "react";
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Axios from 'axios'
import { AuthContext } from "./Auth";
import firebaseConfig from "./config";

//import routes
import Feed from './pages/Feed';
import Favlist from './pages/Favlist';
import Profile from './pages/Profile';
import Editprofile from './pages/Editprofile';
import CreatePost from './pages/CrePost';
import Register from './pages/registerFB';
import Login from './pages/loginFB';  
import ForgotPassword from './pages/ForgotPW';  
import ResetPassword from './pages/ResetPW';     
import Editpost from './pages/Editpost';
import MyPost from "./pages/Mypost";
import History from "./pages/History";

//import style
import './custom.scss';
import { Dropdown } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { GrSearch } from "react-icons/gr";
import { Form, Row, Col } from 'react-bootstrap';

function App() {
  
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState('');
  const [feedPost, setFeedPost] = useState([]);
  const [feed, setFeed] = useState(false);
  const [show, setShow] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Love is Shaing"
  }, [])

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <AiOutlineUser className="icon-nav" style={{ outline: 'none !important', boxShadow: 'none !important' }} />
      {children}
    </a>
  ));

    if (window.location.pathname === '/register' 
        || window.location.pathname === '/login'
        || window.location.pathname === '/forgotpassword'
        || window.location.pathname === '/resetpassword') return (      
      <Switch>
            <Route path="/createpost"><CreatePost/></Route>
            <Route path="/feed"><Feed /></Route>
            <Route path="/favlist"><Favlist /></Route>
            <Route path="/mypost"><MyPost /></Route>
            <Route path="/profile"><Profile /></Route>  
            <Route path="/editprofile"><Editprofile /></Route> 
            <Route path="/login"><Login /></Route>
            <Route path="/register">< Register /></Route>
            <Route path="/forgotpassword"><ForgotPassword /></Route>  
            <Route path="/resetpassword">< ResetPassword /></Route>
            <Route path="/editpost">< Editpost /></Route> 
            <Route path="/history"><History /></Route>
      </Switch>
    );

  const reProfile = () => {
    window.location.href = `/profile`;
  }

  const logOut = () =>{
    firebaseConfig.auth().signOut()
    .then(() =>{
      alert("logout successfully!")
      window.location.href = `/feed`;
    });
  }

  const sideBar = () => {
    if (window.location.pathname === '/profile' 
        || window.location.pathname === '/mypost'
        || window.location.pathname === '/editprofile'
        || window.location.pathname === '/editpost') return (
      <Col xs={2} style={{ marginLeft: '60px', marginTop: '30px' }}>
        <Link to='/profile' className="link-nodec">
          <Row>
            <Col xs={1}><FiMenu className="icon-sim" style={{ marginTop: '5px'}} /></Col>
            <Col className="text-title" style={{ textAlign: 'start', marginLeft: '5px' }}>My Profile</Col>
          </Row>
        </Link>
        <Link to='/mypost'  className="link-nodec">
          <Row style={{ marginTop: '15px'}}>
            <Col xs={1}><FiMenu className="icon-sim" style={{ marginTop: '5px'}} /></Col>
            <Col className="text-title" style={{ textAlign: 'start', marginLeft: '5px' }}>My Post</Col>
          </Row>
        </Link>
      </Col>
    );
  }

  const addPost = () => {
        if(currentUser === null){
          window.location.href = `/login`;
        }else{
          setShow(true).then(() => {
            return <Link to="/createpost" />;
          })
        }
  }

  const showFav = () => {
    if(currentUser === null){
      window.location.href = `/login`;
    }else{
      window.location.href = `/favlist`;
    }
  }

  const showInfo = () => {
    if(currentUser === null){
      window.location.href = `/login`;
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <header className="App-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-#FFF">
              <a class="navbar-brand" href="/"><b class="comname">Love is Sharing.</b></a>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto icon-pos">
                  <li class="nav-item">
                      <AiOutlinePlus variant="primary" className="icon-nav"
                      onClick={ addPost } />
                        <CreatePost
                          show={show}
                          onHide={() => setShow(false)}
                        />
                  </li>
                  <li class="nav-item">
                      <AiOutlineHeart className="icon-nav"
                      onClick={ showFav }/>
                  </li>
                  <li class="nav-item">
                  <Link to="/">
                    <Dropdown style={{ outline: 'none !important', boxShadow: 'none !important' }}
                    onClick={ showInfo } className="btn-click">
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" 
                      className="btn-click" style={{ outline: 'none !important', boxShadow: 'none !important' }}>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="btn-click" style={{ margin: '10px', border: 'white' }}>
                        <Dropdown.Item eventKey="1" className="btn-click"
                        style={{ textAlign: 'right', margin: '5px', outline: 'none', boxShadow: 'none' }}
                        onClick={ reProfile }>
                              Profile
                          </Dropdown.Item>
                        <Dropdown.Item eventKey="2" className="btn-click"
                        style={{ textAlign: 'right', margin: '5px', outline: 'none', boxShadow: 'none' }}
                        onClick={ logOut } >
                          Logout</Dropdown.Item>                    
                      </Dropdown.Menu>
                    </Dropdown>
                  </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <Row>
              { sideBar() }
              <Col>
                <Switch> 
                  <Route path="/createpost"><CreatePost /></Route>
                  <Route path="/feed"><Feed /></Route>
                  <Route path="/favlist"><Favlist /></Route>
                  <Route path="/mypost"><MyPost /></Route>
                  <Route path="/profile"><Profile /></Route>  
                  <Route path="/editprofile"><Editprofile /></Route> 
                  <Route path="/login"><Login /></Route>
                  <Route path="/register"><Register /></Route>
                  <Route path="/forgotpassword"><ForgotPassword /></Route>  
                  <Route path="/resetpassword"><ResetPassword /></Route>
                  <Route path="/editpost"><Editpost /></Route>
                  <Route path="/history"><History /></Route>
                </Switch>
              </Col>
            </Row>
      </header>
      {window.location.pathname === '/' ? (
          <Redirect to="/feed" />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;