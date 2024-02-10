import "./Details.scss";
import DetailBanner from "./DetailBanner/DetailBanner";

import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./Cast/Cast";
import VideosSection from "./VideoSection/VideoSection";
import Similar from "./Carousels/Similar";
import Recommendation from "./Carousels/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  console.log("MediaType =>", mediaType, "Id =>", id);
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  // console.log("VideoData =>",data?.results)
  // console.log("CrewData =>",credits?.data)

  return (
    <div>
      <DetailBanner video={data?.results} crew={credits?.data} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
