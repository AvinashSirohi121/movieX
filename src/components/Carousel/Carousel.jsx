/* eslint-disable react/prop-types */
import "./Carousel.scss";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../../components/laxyLoadImage/Img";
import PosterFallback from "../../images/no-poster.png";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";

const Carousel = ({ data, loading, endpoint,title }) => {
  //console.log("In Caraousel =>> Data =>", data, "Loading =>>", loading);
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state?.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    //console.log("Direction =>", dir);
    const container = carouselContainer.current;
    // console.log("Container ==>", container);
    // console.log("Container ScrollLeft ==>", container.scrollLeft);
    // console.log("Container offSetWidth ==>", container.offsetWidth);

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    //console.log("ScrollAmount =>", scrollAmount);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton "></div>
            <div className="data skeleton "></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && 
        <div className="carouselTitle">
        {title}
        </div>
        }
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data &&
              data.map((item) => {
                const posterUrl = item?.poster_path
                  ? url?.poster + item?.poster_path
                  : PosterFallback;
               // console.log("Item =>", item);
                return (
                  <div
                    key={item.id}
                    className="carouselItem"
                    onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)}
                  >
                    <div className="posterBlock">
                      <Img src={posterUrl} />
                      <CircleRating rating={item?.vote_average.toFixed(1)} />
                      <Genres data={item?.genre_ids.slice(0, 2)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item?.title || item?.name}</span>
                      <span className="date">
                        {dayjs(item?.release_Date).format("MMM DD ,YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
