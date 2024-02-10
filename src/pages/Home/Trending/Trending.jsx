import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "../Home.scss";
import SwitchTab from "../../../components/SwitchTabs/SwitchTabs";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);
  //console.log("In Trending =>>Data =>", data, " Loading =>", loading);
  const onTabChange = (tab) => {
    console.log("Tab ==>", tab);
    if (tab == "day") {
      setEndpoint("week");
    } else if (tab == "week") {
      setEndpoint("day");
    }
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTab
          data={["Days", "Weeks"]}
          onTabChange={() => onTabChange(endpoint)}
        />
      </ContentWrapper>

      <Carousel data={data && data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
