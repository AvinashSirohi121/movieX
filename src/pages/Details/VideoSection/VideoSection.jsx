/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./VideoSection.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PLaybtn";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import Img from "../../../components/laxyLoadImage/Img";
import { useState } from "react";
import avatar from "../../../images/avatar.png"
const VideosSection = ({ data, loading }) => {
  console.log(" Video Data=> ", data);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const videoPlay = (v) => {
    setShow(true);
    setVideoId(v?.key);
  };

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data &&
              data.map((v) => {
                let videoThumbnail = `https://img.youtube.com/vi/${v.key}/mqdefault.jpg` || avatar
                return (
                <div
                  key={v?.id}
                  className="videoItem"
                  onClick={() => videoPlay(v)}
                >
                  <div className="videoThumbnail">
                    <Img
                      src={videoThumbnail}
                    />
                    <PlayIcon/>
                    <div className="videoTitle">
                      {v?.name}
                    </div>
                  </div>
                </div>
            )})}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
