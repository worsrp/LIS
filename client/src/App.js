import React,{useState, useEffect } from "react";
import { Link, Route } from 'react-router-dom';
import Axios from 'axios'

//import routes
import Feed from './pages/Feed';
import Favlist from './pages/Favlist';
import Profile from './pages/Profile';
import Editprofile from './pages/Editprofile';
import CreatePost from './pages/Createpost';
import Register from './pages/Register';
import Login from './pages/Login';  
import Sendotp from './pages/Sendotp';  
import ResetPass from './pages/Resetpass';     
import Editpost from './pages/Editpost';
import MyPost from "./pages/Mypost";
import Vertify from "./pages/Vertify";

import { AuthContext } from "./helpers/AuthContext";

//import style
import './custom.scss';
import { Dropdown } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { GrSearch } from "react-icons/gr";
import { Form, Row, Col } from 'react-bootstrap';



function App() {
  
  const [pp, setApp] = useState([]);
  
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState('');
  const [feedPost, setFeedPost] = useState([]);


  //link user --------------------------------------------------------------------
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    Axios.get("http://localhost:8000/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, status: false });
  };

//end--------------------------------------------------------------------------
  

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
    <div>
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
            <Route path="/resetpass">< ResetPass /></Route>  
            <Route path="/editpost/:post_id">< Editpost /></Route>
        </div>
  );
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>  
        <header className="App-header">
          <nav class="navbar navbar-expand-lg navbar-light bg-#FFF">
            <a class="navbar-brand" href="/"><b class="comname">Love is Sharing. {authState.firstname}</b></a>
        
            {!authState.status && (
                <>
                  <Redirect to="/login"></Redirect>
                </>
              )}

            <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="1">
                          <GrSearch className="icon-large search-icon-pos" style={{ marginLeft: '70px' }} />
                      </Form.Label>
                      <Col sm="3">
                      <Form.Control type="text" placeholder="What are you looking for?"
                      className="search-bar search-bar-pos"/>
                      </Col>
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
                        
                        {authState.status &&
                      <Dropdown.Item eventKey="2" 
                      style={{ textAlign: 'right', margin: '5px', outline: 'none', boxShadow: 'none' }}>
                        Logout</Dropdown.Item>}
                                          
                    </Dropdown.Menu>
                  </Dropdown>
                </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div>
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
              <Route path="/resetpass">< ResetPass /></Route>  
              <Route path="/editpost/:post_id">< Editpost /></Route>
              <Route path="/auth">< Auth /></Route>

          </div>
        </header>
        </AuthContext.Provider>
      </div>
  );
}

export default App;