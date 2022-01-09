import { Link, Route } from 'react-router-dom';

//import routes
<<<<<<< HEAD
import CreatePost from './pages/createPost';

//import style
import './custom.scss';
=======
import CreatePost from './pages/Createpost';
import Feed from './pages/Feed';
import Favlist from './pages/Favlist';
>>>>>>> b551ecaa2e4f5f3bba33dac2783ea2abdbf442b9

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-#FFF">
          <a class="navbar-brand" href="/"><b class="comname">Love is Sharing.</b></a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto icon-pos">
              <li class="nav-item">
                <Link to="/createpost">
                  <i class="bi bi-plus-lg icon-large icon-area"></i>
                  </Link>
              </li>
              <li class="nav-item">
                <Link to="/"><i class="bi bi-heart icon-large icon-area"></i></Link>
              </li>
              <li class="nav-item">
              <Link to="/"><i class="bi bi-person-circle icon-large icon-area"></i></Link>
              </li>
            </ul>
          </div>
        </nav>

        <div>
            <Route path="/createpost">
              <CreatePost />
            </Route>
        </div>

        <div>
            <Route path="/feed">
              <Feed />
            </Route>
        </div>

        <div>
            <Route path="/favlist">
              <Favlist />
            </Route>
        </div>
      </header>
    </div>
  );
}

export default App;