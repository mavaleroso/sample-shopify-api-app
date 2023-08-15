import './App.css';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');

  const exportData = () => {
    axios.post("http://localhost:3001/api/blog/article/create", {
      body_html: value,
    })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="App">
      <header className="p-3 text-bg-dark">
        <div className="container">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            Sample Shopify API for posting Article
          </a>
        </div>
      </header>
      <div className="container p-4">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <button onClick={exportData} className="btn btn-primary mt-2 me-auto d-block">Export</button>
      </div>
    </div>
  );
}

export default App;
