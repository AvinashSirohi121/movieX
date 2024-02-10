/* eslint-disable react/no-unescaped-entities */
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "../Home.scss";
import SwitchTab from "../../../components/SwitchTabs/SwitchTabs";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  //console.log("In Trending =>>Data =>", data, " Loading =>", loading);
  const onTabChange = (tab) => {
    //console.log("Tab ==>", tab);
    if (tab == "movie") {
      setEndpoint("tv");
    } else if (tab == "tv") {
      setEndpoint("movie");
    }
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTab
          data={["Movies", "TV"]}
          onTabChange={() => onTabChange(endpoint)}
        />
      </ContentWrapper>

      <Carousel
        endpoint={endpoint}
        data={data && data?.results}
        loading={loading}
      />
    </div>
  );
};

export default Popular;
