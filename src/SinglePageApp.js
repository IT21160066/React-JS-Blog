import { Routes, Route } from "react-router-dom";
// import { DataProvider } from "./context/DataContext";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";
import Home from "./Home";
import NewPost from "./NewPost";
import Missing from "./Missing";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const SinglePageApp = () => {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  //console.log(data);

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title={"React JS Blog"} />
      {/* <DataProvider> */}
      <Nav />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home isLoading={isLoading} fetchError={fetchError} />}
        ></Route>
        <Route path="/post" exact element={<NewPost />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>
        <Route path="/post/:id" element={<PostPage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<Missing />}></Route>
      </Routes>
      {/* </DataProvider> */}
      <Footer />
    </div>
  );
};

export default SinglePageApp;
