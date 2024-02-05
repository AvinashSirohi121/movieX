import "./Home.scss";
import HeroBanner from "./HeroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <div style={{ height: 1000 }}></div>
    </div>
  );
};

export default Home;
