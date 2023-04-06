import "./index.css";
import Header from "../Header";
import Links from "../Links";
import BannerSection from "../BannerSection";
import { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Bars } from "react-loader-spinner";
import HomePageVideoDetails from "../HomePageVideoDetails";
const apiStatusConstants = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [videosList, setVideosList] = useState([]);
  const [videos, setVideos] = useState(6);
  const [searchInp, setSearchInp] = useState("");
  const [searchQueary, setSearchQueary] = useState("");
  const searchRef = useRef(null);
  // const [isLoading, setIsLoading] = useState(false);
  const slicedVideos = videosList.slice(0, videos);
  const getHomeSectionVideos = useCallback(async () => {
    setApiStatus(apiStatusConstants.progress);
    const jwtToken = Cookies.get("jwtToken");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchQueary}`,
      options
    );

    if (response.ok) {
      const data = await response.json();
      const updatedData = data.videos.map((eachVideo) => ({
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        channelName: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }));
      setVideosList(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else if (!response.ok) {
      setApiStatus(apiStatusConstants.failure);
    }
  }, [searchQueary]);
  useEffect(() => {
    getHomeSectionVideos();
  }, [getHomeSectionVideos]);
  useEffect(() => {
    const handler = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // setIsLoading(true);
        setVideos((prevState) => {
          //   setTimeout(() => {
          //     setIsLoading(false);
          //   }, 2000);
          return prevState + 6;
        });
      }
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);
  const onClickRetry = () => {
    getHomeSectionVideos();
  };
  const getFailureView = () => {
    return (
      <div className="no-results-div">
        <img
          className="no-results-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png "
          alt="no videos"
        />
        <h3>Oops! Something Went Wrong</h3>
        <p className="no-res-p">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button className="retry-btn" type="button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    );
  };
  const getProgressView = () => (
    <div className="loader-container">
      <Bars
        height="50"
        width="60"
        color="red"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
  const nosearchBtn = () => {
    setSearchQueary("");
    setSearchInp("");
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const getSuccessView = () => (
    <div className="home-videos-container">
      {videosList.length > 0 ? (
        <HomePageVideoDetails videosList={slicedVideos} />
      ) : (
        <div className="no-results-div">
          <img
            className="no-results-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <h3>No Search results found</h3>
          <p className="no-res-p">
            Try different key words or remove search filter
          </p>
          <button className="retry-btn" type="button" onClick={nosearchBtn}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
  const getVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return getProgressView();
      case apiStatusConstants.success:
        return getSuccessView();
      case apiStatusConstants.failure:
        return getFailureView();
      default:
        return null;
    }
  };
  const onChangeSearch = (event) => {
    setSearchInp(event.target.value);
  };
  const onClickSearch = () => {
    setSearchQueary(searchInp);
  };

  const getHomeSectionDetails = () => {
    return (
      <div className="home-main-container">
        <div>
          <Header />
        </div>
        <div className="home-section-links-and-videos-container">
          <div>
            <Links />
          </div>
          <div className="banner-section-and-video-main-container">
            <div>
              <BannerSection />
            </div>
            <div>
              <input
                type="search"
                onChange={onChangeSearch}
                value={searchInp}
                ref={searchRef}
              />
              <button onClick={onClickSearch}>search</button>
              {getVideos()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{getHomeSectionDetails()}</div>;
};
export default Home;
