import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import BlogState from './context/BlogState';
import UserState from './context/UserState';
import {
  BrowserRouter
} from "react-router-dom"
import * as React from 'react';

import ClippedDrawer from './components/ClippedDrawer';

const drawerWidth = 240;

function App() {
  return (
    <BrowserRouter>
      <UserState>
        <BlogState>
          <ClippedDrawer />
        </BlogState>
      </UserState>
    </BrowserRouter>
  );
}

export default App;
