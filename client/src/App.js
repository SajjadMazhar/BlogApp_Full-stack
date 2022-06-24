import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import BlogState from './context/BlogState';
import UserState from './context/UserState';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom"
import CreateBlog from './components/pages/CreateBlog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserState>
          <BlogState>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/newblog" element={<CreateBlog/>} />
            </Routes>
          </BlogState>
        </UserState>
      </BrowserRouter>
    </div>
  );
}

export default App;
