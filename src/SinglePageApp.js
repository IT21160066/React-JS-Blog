import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Home from "./Home";
import NewPost from "./NewPost";
import Missing from "./Missing";
import PostPage from "./PostPage";
import About from "./About";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const SinglePageApp = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy hh:mm:ss a");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  const handleDelete = (id) => {
    const postList = posts.filter((post) => post.id !== id);
    setPosts(postList);
    navigate("/");
  };

  return (
    <div className="App">
      <Header title={"React JS Blog"} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" exact element={<Home posts={searchResults} />}></Route>
        <Route
          path="/post"
          exact
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        ></Route>
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<Missing />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default SinglePageApp;
