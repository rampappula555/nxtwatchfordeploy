import { Route, Routes } from "react-router";
import "./App.css";
// import Trending from "./components/Trending";
import VideoItemDetails from "./components/VideoItemDetails";
import Home from "./components/Home";
// import LoginForm from "./components/LoginForm";
// import Header from "./components/Header";
// import Links from "./components/Links";
import VideosContext from "./context/VideosContext";
import { useState } from "react";
function App() {
  const [likedVideos, setLikedVideos] = useState([]);
  const [unlikedVideos, setUnlikedVideos] = useState([]);
  const addToLikedVideos = (likedVideo) => {
    setLikedVideos((prevState) => {
      const index = prevState.findIndex((each) => {
        if (each.id === likedVideo.id) {
          return true;
        } else {
          return false;
        }
      });
      if (index !== -1) {
        return prevState;
      } else {
        return [...prevState, likedVideo];
      }
    });
  };

  const removeFromLikedVideos = (likedVideo) => {
    setLikedVideos((prevState) => {
      const index = prevState.findIndex((each) => {
        if (each.id === likedVideo.id) {
          return true;
        } else {
          return false;
        }
      });
      if (index !== -1) {
        prevState.splice(index, 1);
        return [...prevState];
      } else {
        return prevState;
      }
    });
  };
  console.log(likedVideos);
  return (
    <VideosContext.Provider
      value={{
        likedVideos,
        unlikedVideos,
        addToLikedVideos,
        removeFromLikedVideos,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Videos/:id" element={<VideoItemDetails />} />
      </Routes>
    </VideosContext.Provider>
  );
}

export default App;
