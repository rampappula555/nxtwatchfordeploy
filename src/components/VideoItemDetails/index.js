import "./index.css";
import Header from "../Header";
import Links from "../Links";
import { useParams } from "react-router";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Cookies from "js-cookie";
import VideosContext from "../../context/VideosContext";
const initialState = { isLiked: false, isUnliked: false };
const reducer = (currState, action) => {
  switch (action.type) {
    case "like":
      return { ...currState, isLiked: !currState.isLiked, isUnliked: false };
    case "unlike":
      return { ...currState, isUnliked: !currState.isUnliked, isLiked: false };
    default:
      return currState;
  }
};
const VideoItemDetails = () => {
  const value = useContext(VideosContext);
  const { addToLikedVideos, removeFromLikedVideos, likedVideos } = value;
  const [videoDetails, setVideoDetails] = useState({});
  const { id } = useParams();

  const parsedStatus = JSON.parse(sessionStorage.getItem(`likeUnlike${id}`));
  const [likeUnlike, dispatch] = useReducer(
    reducer,
    parsedStatus === null ? initialState : parsedStatus
  );
  const [onClickLike, setOnClickLike] = useState(false);
  const y = likedVideos.filter((each) => each.id === id);
  let x = false;
  if (y.length > 0) {
    x = y[0].id === id;
  }

  const getVideoItemDetails = useCallback(async () => {
    const jwtToken = Cookies.get("jwtToken");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options);
    if (response.ok) {
      const data = await response.json();
      const updatedData = {
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        name: data.video_details.channel.name,
        image: data.video_details.channel.profile_image_url,
      };
      setVideoDetails(updatedData);
    }
  }, [id]);
  useEffect(() => {
    getVideoItemDetails();
  }, [getVideoItemDetails]);
  useEffect(() => {
    if (likeUnlike.isLiked) {
      addToLikedVideos({ id });
    } else if (!likeUnlike.isLiked && onClickLike) {
      removeFromLikedVideos({ id });
    }
  }, [addToLikedVideos, id, onClickLike, removeFromLikedVideos, likeUnlike]);
  useEffect(() => {
    sessionStorage.setItem(`likeUnlike${id}`, JSON.stringify(likeUnlike));
  }, [likeUnlike, id]);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <div>
          <Links />
        </div>
        <div>
          <img src={videoDetails.thumbnailUrl} alt="img" />

          <img src={videoDetails.image} alt="img" />
          <p>{videoDetails.name}</p>
          <button
            className={likeUnlike.isLiked || x ? "is-liked" : null}
            onClick={() => {
              dispatch({ type: "like" });
              setOnClickLike(true);
            }}
          >
            Like
          </button>
          <button
            className={likeUnlike.isUnliked ? "is-unliked" : null}
            onClick={() => dispatch({ type: "unlike" })}
          >
            unlike
          </button>
          <button>save</button>
        </div>
      </div>
    </div>
  );
};
export default VideoItemDetails;
