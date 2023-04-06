import React from "react";
const VideosContext = React.createContext({
  likedVideos: [],
  addToLikedVideos: () => {},
  removeFromLikedVideos: () => {},
  unlikedVideos: [],
  addToUnlikedVideos: () => {},
  removeFromUnlikedVideos: () => {},
});
export default VideosContext;
