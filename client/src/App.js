import './custom.scss';
import { Link, Route } from 'react-router-dom';


//import routes
import CreatePost from './pages/Createpost';
import Feed from './pages/Feed';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-#FFF">
          <a class="navbar-brand" href="/"><b class="comname">Love is Sharing.</b></a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto icon-pos">
              <li class="nav-item">
                <Link to="/createpost"><i class="bi bi-plus-lg icon-large icon-area"></i></Link>
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
      </header>
    </div>
  );
}

export default App;