import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BlogState from './context/BlogState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BlogState>
    <App />
  </BlogState>
);


