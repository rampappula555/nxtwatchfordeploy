import "./index.css";
import { Link } from "react-router-dom";
const HomePageVideoDetails = (props) => {
  const { videosList } = props;
  return (
    <ul className="videolist-ul">
      {videosList.map((eachVideo) => {
        const {
          id,
          thumbnailUrl,
          profileImageUrl,
          viewCount,
          publishedAt,
          channelName,
          title,
        } = eachVideo;

        return (
          <Link className="videolist-li" key={id} to={`/Videos/${id}`}>
            <li>
              <img
                className="thumbnail"
                src={thumbnailUrl}
                alt="thumbnailUrl"
              />
              <div className="title-profile-card">
                <img
                  className="profile-img"
                  src={profileImageUrl}
                  alt="profileImageUrl"
                />
                <div className="title-div">
                  <h3 className="title">{title}</h3>
                  <div className="n-v-p-div">
                    <p className="name-h">{channelName}</p>
                    <ul className="v-p-ul">
                      <li className="v-c-li-v">{viewCount}</li>
                      <li className="v-c-li-p">{publishedAt}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
export default HomePageVideoDetails;
