import './App.css';
import BlogState from './context/BlogState';
import UserState from './context/UserState';
import {
  BrowserRouter
} from "react-router-dom"
import * as React from 'react';

import ClippedDrawer from './components/ClippedDrawer';


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
