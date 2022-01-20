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
import CreatePost from './pages/Createpost';
import Register from './pages/registerFB';
import Login from './pages/loginFB';  
import Sendotp from './pages/Sendotp';  
import ResetPass from './pages/Resetpass';     
import Editpost from './pages/Editpost';
import MyPost from "./pages/Mypost";
import Vertify from "./pages/Vertify";
import CreatepostImage from "./pages/CreatepostImage";

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

  const { currentUser } = useContext(AuthContext);

    // if(currentUser === null){
    //       return <Redirect to="/login" />;
    // }


  const searchPost = () => {
    if(search !== ''){
        Axios.post("http://localhost:8000/feed", { 
            item: search
        }).then((response) => {
            setFeedPost(response.data);
        })
    }
  };

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

    if (window.location.pathname === '/register' || window.location.pathname === '/login') return (      
      <Switch>
            <Route path="/createpost"><CreatePost/></Route>
            <Route path="/feed"><Feed /></Route>
            <Route path="/favlist"><Favlist /></Route>
            <Route path="/mypost"><MyPost /></Route>
            <Route path="/profile"><Profile /></Route>  
            <Route path="/editprofile"><Editprofile /></Route> 
            <Route path="/login"><Login /></Route>
            <Route path="/register">< Register /></Route>
            <Route path="/sendotp">< Sendotp /></Route>  
            <Route path="/resetpass">< ResetPass /></Route>
            <Route path="/vertify">< Vertify /></Route>  
            <Route path="/editpost">< Editpost /></Route> 
            <Route path="/createpostimage"> <CreatepostImage/></Route>
      </Switch>
    );


  const isFeed = () => {
      if (window.location.pathname === '/feed') return (
        <div>
              <Form.Label column sm="1">
                  <GrSearch className="icon-large search-icon-pos" style={{ marginLeft: '70px' }} />
              </Form.Label>
              <Col sm="3">
                  <Form.Control type="text" placeholder="What are you looking for?"
                      className="search-bar search-bar-pos"
                      onChange={ (e) => {setSearch(e.target.value)}} 
                      onSubmit={ searchPost } required />
              </Col>
        </div>
      );
  }

  const sideBar = () => {
    if (window.location.pathname === '/profile' 
        || window.location.pathname === '/mypost'
        || window.location.pathname === '/editprofile') return (
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

  return (
    <div className="App">
      <header className="App-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-#FFF">
              <a class="navbar-brand" href="/"><b class="comname">Love is Sharing.</b></a>
              <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <isFeed />
                    </Form.Group>
                </Form>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto icon-pos">
                  <li class="nav-item">
                    <Link to="/createpost">
                      <AiOutlinePlus variant="primary" className="icon-nav"
                      onClick={() => setModalShow(true)} />
                        <CreatePost
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/favlist">
                      <AiOutlineHeart className="icon-nav" />
                    </Link>
                  </li>
                  <li class="nav-item">
                  <Link to="/">
                    <Dropdown style={{ outline: 'none !important', boxShadow: 'none !important' }}>
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" style={{ outline: 'none !important', boxShadow: 'none !important' }}>
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ margin: '10px', border: 'white' }}>
                        <Dropdown.Item eventKey="1" 
                        style={{ textAlign: 'right', margin: '5px', outline: 'none', boxShadow: 'none' }}>
                            <Link to="/profile" className="link-nodec">
                              Profile
                            </Link>
                          </Dropdown.Item>
                        <Dropdown.Item eventKey="2" 
                        style={{ textAlign: 'right', margin: '5px', outline: 'none', boxShadow: 'none' }}
                        onClick={() => firebaseConfig.auth().signOut()} >
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
                  <Route path="/createpost"><CreatePost/></Route>
                  <Route path="/feed"><Feed /></Route>
                  <Route path="/favlist"><Favlist /></Route>
                  <Route path="/mypost"><MyPost /></Route>
                  <Route path="/profile"><Profile /></Route>  
                  <Route path="/editprofile"><Editprofile /></Route> 
                  <Route path="/login">< Login /></Route>
                  <Route path="/register">< Register /></Route>
                  <Route path="/sendotp">< Sendotp /></Route>  
                  <Route path="/resetpass">< ResetPass /></Route>
                  <Route path="/vertify">< Vertify /></Route>  
                  <Route path="/editpost">< Editpost /></Route>
                  <Route path="/createpostimage"> <CreatepostImage/></Route>
                </Switch>
              </Col>
            </Row>
      </header>
    </div>
  );
}

export default App;