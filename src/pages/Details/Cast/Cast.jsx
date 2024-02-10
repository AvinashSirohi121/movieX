/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

import "./Cast.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/laxyLoadImage/Img";
import avatar from "../../../images/avatar.png";

const Cast = ({ data, loading }) => {
  console.log("Cast Data =>>", data, "loading =>", loading);
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data &&
              data?.map((item) => {
                let imgUrl = item?.profile_path
                  ? url?.backdrop + item?.profile_path
                  : avatar;
                console.log("Cast Img =>", imgUrl);
                return (
                  <div key={item?.id} className="listItem">
                    <div className="profileImg">
                      <Img src={imgUrl} />
                    </div>
                    <div className="name">{item?.name}</div>
                    <div className="character">{item?.character}</div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
