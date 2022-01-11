import React,{useState, useEffect } from "react";
import { Link, Route } from 'react-router-dom';

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

//import style
import './custom.scss';
import { Dropdown } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

function App() {
  
  const [modalShow, setModalShow] = React.useState(false);

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

  return (
    <div className="App">
      <header className="App-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-#FFF">
          <a class="navbar-brand" href="/"><b class="comname">Love is Sharing.</b></a>
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
                    style={{ textAlign: 'right', margin: '5px', outline: 'none', boxShadow: 'none' }}>
                      Logout</Dropdown.Item>                    
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
        </div>
      </header>
    </div>
  );
}

export default App;