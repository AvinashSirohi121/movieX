/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch.js";
import Genres from "../../../components/Genres/Genres.jsx";
import CircleRating from "../../../components/CircleRating/CircleRating.jsx";
import Img from "../../../components/laxyLoadImage/Img";
import PosterFallBack from "../../../images/no-poster.png";
import { PlayIcon } from "../PLaybtn.jsx";
import VideoPopup from "../../../components/VideoPopup/VideoPopup.jsx";

const DetailBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  //console.log("DetailBanner Data =>", data);
  const url = useSelector((state) => state.home);
  const img = data?.backdrop_path
    ? url?.url?.backdrop + data?.backdrop_path
    : PosterFallBack;
  console.log("PosterPath =>", img);
  const posterImg = data?.poster_path
    ? url?.url?.backdrop + data?.poster_path
    : PosterFallBack;
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const _genres = data?.genres.map((g) => g.id);

  const director = crew?.crew?.filter((f) => f.job === "Director");
  const writer = crew?.crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const playVideo = () => {
    setShow(true);
    // console.log("Video==>", video);

    const videoLink = video?.map((v) => {
      //   console.log("V==>", video, v);
      let trailer = [];
      if (v?.type === "Trailer") {
        trailer.push(v.key);
      }
      return trailer;
    });
    let trailer = videoLink?.flat();
    //console.log("Trailer =>", trailer, trailer[0]);
    if (trailer?.length > 0) {
      setVideoId(trailer?.[0]);
    }
  };

  //console.log("Director =>", director, " Writer =>", writer);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={img} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    <Img src={posterImg} className="posterImg" />
                  </div>
                  <div className="right">
                    <div className="title">{`${
                      data?.title ? data?.title : data?.name
                    } (${dayjs(data?.release_data).format("YYYY")})`}</div>

                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />

                      <div className="playbtn" onClick={() => playVideo()}>
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">OverView</div>
                      <div className="description">{data?.overview}</div>
                    </div>

                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status : </span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Data : </span>
                          <span className="text">
                            {dayjs(data?.release_date).format("DD MMM , YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime : </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director && director.length > 0 && (
                      <div className="info">
                        <div className="infoItem">
                          <span className="text bold">Director : </span>
                          {director.map((d, i) => (
                            <span className="text" key={d?.id || i}>
                              {d?.original_name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {writer && writer.length > 0 && (
                      <div className="info">
                        <div className="infoItem">
                          <span className="text bold">Writer : </span>

                          {writer.map((d, i) => (
                            <span className="text" key={d?.id || i}>
                              {d?.original_name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {data?.created_by && data?.created_by.length > 0 && (
                      <div className="info">
                        <div className="infoItem">
                          <span className="text bold">Creater : </span>

                          {data?.created_by.map((d, i) => (
                            <span className="text" key={d?.id || i}>
                              {d?.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailBanner;
