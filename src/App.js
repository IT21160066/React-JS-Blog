import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import NewPost from "./NewPost";
import Missing from "./Missing";
import PostPage from "./PostPage";
import About from "./About";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
